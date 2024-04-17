# == Schema Information
#
# Table name: issues
#
#  id                 :bigint           not null, primary key
#  title              :string
#  content            :text
#  state              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  milestone_id       :bigint
#  bak_creator_id     :bigint
#  bak_assignee_id    :bigint
#  project_id         :bigint
#  last_edited_at     :datetime
#  creator_id         :bigint
#  assignee_id        :bigint
#  priority           :string
#  task_id            :bigint
#  label_ids_cache    :bigint           default([]), is an Array
#  category_id        :bigint
#  archived_at        :datetime
#  stage              :string
#  legacy_project_ids :integer          default([]), is an Array
#  trello_card_id     :string
#

class Issue < ApplicationRecord
  enumerize :state, in: [ :pending, :waiting, :confirmed, :suspending, :processing, :processed, :deploying, :resolved, :closed ],
                    default: :pending, scope: true
  enumerize :stage, in: [ :pending, :developing, :testing, :deploying, :resolved, :closed, :archived ], scope: true
  enumerize :priority, in: { low: :p2_low, normal: :p1_normal, important: :p0_important }, default: :normal, scope: true

  has_many :comments, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_users, through: :subscriptions, source: :user
  belongs_to :milestone, optional: true
  belongs_to :creator, class_name: Member.to_s
  belongs_to :assignee, class_name: Member.to_s, optional: true
  belongs_to :project
  belongs_to :category, optional: true
  belongs_to :task, optional: true
  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable, autosave: true
  has_many :activities, class_name: IssueActivity.to_s, dependent: :destroy
  has_many :source_relationships, class_name: IssueRelationship.to_s, foreign_key: :source_id, dependent: :destroy
  has_many :target_relationships, class_name: IssueRelationship.to_s, foreign_key: :target_id, dependent: :destroy
  has_many :issue_surveys

  validates :title, presence: true
  validate :require_category_when_archive

  before_save :generate_stage

  scope :sorted, -> { order(:priority) }
  scope :created_issues, ->(member) { where(creator_id: member.id) }
  scope :assigned_issues, ->(member) { where(assignee_id: member.id) }
  scope :subscribed_issues, ->(user) { joins(:subscriptions).where(subscriptions: { user_id: user.id }) }
  scope :assignee_id_is, ->(value) { value.in?(["not_null", true]) ? where.not(assignee_id: nil) : where(assignee_id: nil) }
  scope :archived_at_is, ->(value) { value.in?(["not_null", true]) ? where.not(archived_at: nil) : where(archived_at: nil) }
  scope :filter_state_is, ->(code) {
    conds = self.filter_states_options[code.to_sym][:conds]
    cond_any_of(conds)
  }
  scope :in_project, ->(project) { where_any_of(
    Issue.where(project_id: project.id),
    Issue.where("? = ANY(legacy_project_ids)", project.id)
  )}

  scope :state_filter, ->(text) {
    case text
    when "opening"
      where(state: [ "pending", "waiting", "confirmed", "processing" ])
    when "all"
      self
    else
      where(state: text)
    end
  }

  def generate_stage
    if archived_at?
      self.stage = :archived
    elsif state.pending? || state.waiting? || state.suspending?
      self.stage = :pending
    elsif state.confirmed?
      self.stage = assignee_id? ? :developing : :pending
    elsif state.processing?
      self.stage = :developing
    elsif state.processed?
      self.stage = :testing
    elsif state.deploying?
      self.stage = :deploying
    elsif state.resolved?
      self.stage = :resolved
    elsif state.closed?
      self.stage = :closed
    else
      self.stage = nil
    end
  end

  def attachments_params=(raw)
    array = raw.is_a?(Array) ? raw : raw.values
    new_attachment_ids = array.map { |it| it.symbolize_keys[:id] }
    attachment_repo = Attachment.where_any_of(
      Attachment.where(attachmentable_type: self.class.name, attachmentable_id: self.id),
      Attachment.where(attachmentable_id: nil)
    ).where(id: new_attachment_ids).index_by(&:id)

    new_attachments = array.map do |attrs|
      attrs = attrs.symbolize_keys
      attachment = attachment_repo[attrs[:id].to_i]
      attachment.assign_attributes(attrs)
      attachment
    end

    self.attachments = new_attachments
  end

  def title_with_priority
    prefix = priority.important? ? "!!" : ""
    "#{prefix}#{title}"
  end

  def default_title
    [task].compact.map do |task|
      test_case = task.test_case
      "#{test_case.folder.name}-#{test_case.title}"
    end.join(" ")
  end

  def default_content
    [task].compact.map(&:message).join(" ")
  end

  def update_with_author(params, member)
    transaction do
      assign_attributes(params)
      self.last_edited_at = Time.current if will_save_change_to_content?
      raise ActiveRecord::Rollback unless self.save
      record_property_changes!(member)
    end
  end

  def change_project_with_author(params, member)
    target_project_id = params[:project_id]
    target_project = member.user.projects.find(target_project_id)

    # project_id = params[:targert_project_id] || params[:project_id]
    # new_project = member.user.projects.find(project_id)
    # self.project_id = project_id
    # self.creator = new_project.members.find_by(user_id: self.creator&.user_id) || self.creator
    # self.assignee = new_project.members.find_by(user_id: self.assignee&.user_id)
    # self.category = new_project.categories.find_by(id: params[:category_id])
    # self.milestone_id = nil
    # transaction do
    #   unless self.save
    #     raise ActiveRecord::Rollback
    #   end
    #   record_property_changes!(member)
    # end
  end

  def record_property_changes!(member)
    previous_changes.slice(:creator_id, :assignee_id, :state, :milestone_id, :category_id, :archived_at).map do |property, (before_value, after_value)|
      activity = self.activities.new
      activity.member_id = member.id

      activity.property = property
      activity.before_value = before_value
      activity.after_value = after_value
      activity.save!
      activity
    end
  end

  def notify_created_by(author)
    email_list.without(author.email).each { |address| IssueMailer.created_notification(self.id, author.id, address).deliver_later }
  end

  def notify_assigned_by(author)
    email_list.without(author.email).each { |address| IssueMailer.assigned_notification(self.id, author.id, address).deliver_later }
  end

  def notify_state_changed_by(author)
    email_list.without(author.email).each { |address| IssueMailer.state_changed_notification(self.id, author.id, address).deliver_later }
  end

  def notify_commented_by(author)
    email_list.without(author.email).each { |address| IssueMailer.commented_notification(self.id, author.id, address).deliver_later }
  end

  def notify_creator
    IssueMailer.state_changed_notification(self.id, self.creator_id, self.creator.user.email).deliver_later
  end

  def notify_changed_by(author, changes)
    if changes.key?(:id)
      notify_created_by(author)
      return
    end

    if changes.key?(:assignee_id)
      notify_assigned_by(author)
    end

    if changes.key?(:state)
      notify_state_changed_by(author)
    end
  end

  def process(params, member)
    errors.add(:state, :invalid) and return false if ![:confirmed, :processing, :processed].include?(state.to_sym)

    if params[:state] == "processed"
      self.state = :processed
    else
      self.state = :processing
    end

    transaction do
      raise ActiveRecord::Rollback if !self.save
      record_property_changes!(member)
    end

    errors.empty?
  end

  def resolve(params, member)
    errors.add(:stage, :invalid) and return false if !stage.closed? && !stage.resolved?

    if params[:action] == "resolve"
      archive(member)
    else
      unresolve(params[:comment_attributes], member)
    end
  end

  def unresolve(comment_params, member)
    self.errors.add(:state, :invalid) and return false if self.state.pending?

    transaction do
      comment = self.comments.new(member_id: self.creator_id)
      comment.assign_attributes(comment_params)
      self.state = :pending

      if !comment.save
        self.errors.add(:comment, comment.errors.full_messages.first)
        raise ActiveRecord::Rollback
      end

      raise ActiveRecord::Rollback if !save

      record_property_changes!(member)
    end

    errors.empty?
  end

  def archive(member)
    self.errors.add(:archived_at, :invalid) and return false if self.archived_at

    self.archived_at = Time.current
    transaction do
      raise ActiveRecord::Rollback unless self.save
      record_property_changes!(member)
    end

    errors.empty?
  end

  def self.filter_states_options
    {
      assign: [ { state: ["pending", "waiting"] }, { state: "confirmed", assignee_id_is: false } ],
      develop: [ { state: "confirmed", assignee_id_is: true }, { state: "processing" } ],
      test:  [ { state: "processed" } ],
      deploy: [ { state: "deploying" } ],
      resolve: [ { state: "resolved", archived_at_is: false } ],
      closed: [ { state: ["closed"], archived_at_is: false } ],
      archive: [ { archived_at_is: true } ],
    }.to_h do |code, conds|
      attrs = {}
      attrs[:states] = [code.to_s]
      attrs[:conds] = conds || [ { state: code } ]
      attrs[:text] = I18n.t(code, scope: "enumerize.issue.state")
      [ code, attrs ]
    end
  end

  def self.ransackable_scopes(auth_object = nil)
    [ :state_filter, :assignee_id_is, :archived_at_is ]
  end

  def require_category_when_archive
    if assignee.present? || state.to_sym.in?([:confirmed, :processing, :processed, :deploying, :resolved])
      if !category.present?
        self.errors.add(:category_id, :empty)
      end
    end
  end

  def available_subscribed_users
    subscribed_users.where_exists(project.members.where(receive_mail: true, archived_at: nil).where_table(:user))
  end

protected
  def email_list
    (available_subscribed_users + project.available_subscribed_users).uniq.map(&:email)
  end
end
