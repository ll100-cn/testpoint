# == Schema Information
#
# Table name: issues
#
#  id              :bigint           not null, primary key
#  title           :string
#  content         :text
#  state           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  milestone_id    :bigint
#  bak_creator_id  :bigint
#  bak_assignee_id :bigint
#  project_id      :bigint
#  last_edited_at  :datetime
#  creator_id      :bigint
#  assignee_id     :bigint
#  state_at        :datetime
#

class Issue < ApplicationRecord
  enumerize :state, in: [:pending, :processing, :processed, :closed, :resolved], default: :pending

  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :issues_labels, dependent: :destroy
  has_many :labels, through: :issues_labels
  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_users, through: :subscriptions, source: :user
  belongs_to :milestone, optional: true
  belongs_to :creator, class_name: Member.to_s
  belongs_to :assignee, class_name: Member.to_s, optional: true
  belongs_to :project
  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable
  has_many :activities, class_name: IssueActivity.to_s, dependent: :destroy
  has_many :source_relationships, class_name: IssueRelationship.to_s, foreign_key: :source_id, dependent: :destroy
  has_many :target_relationships, class_name: IssueRelationship.to_s, foreign_key: :target_id, dependent: :destroy

  validates :title, presence: true

  before_save :ensure_state_at, if: -> { will_save_change_to_state? }

  scope :with_labels, -> { includes(:labels) }
  scope :created_issues, ->(member) { where(creator_id: member.id) }
  scope :assigned_issues, ->(member) { where(assignee_id: member.id) }
  scope :subscribed_issues, ->(user) { joins(:subscriptions).where(subscriptions: { user_id: user.id }) }
  scope :state_filter, ->(text) {
    case text
    when "opening"
      where(state: [ "pending", "processing" ])
    when "all"
      self
    else
      where(state: text)
    end
  }

  def default_title
    tasks.map do |task|
      test_case = task.test_case
      "#{test_case.folder.name}-#{test_case.title}"
    end.join(" ")
  end

  def default_content
    tasks.map(&:message).join(" ")
  end

  def self.ransackable_scopes(auth_object = nil)
   [ :state_filter ]
 end

 def update_with_editor(params, member)
   assign_attributes(params)
   self.last_edited_at = Time.current if will_save_change_to_content?
   transaction do
     unless self.save
       raise ActiveRecord::Rollback
     end
     record_property_changes!(member)
   end
 end

 def record_property_changes!(member)
   previous_changes.slice(:creator_id, :assignee_id, :state).each do |property, (before_value, after_value)|
     activity = self.activities.new
     activity.property = property
     activity.before_value = before_value
     activity.after_value = after_value
     activity.member_id = member.id
     activity.save!
   end
 end

 def deliver_changed_notification(changer, with_chief: false)
   recevier_ids = [
     self.creator.user_id,
     self.assignee&.user_id,
     self.subscribed_user_ids
   ]

   recevier_ids += self.project.members.chief.pluck(:user_id) if with_chief
   recevier_ids = recevier_ids.flatten.compact.uniq
   recevier_ids.delete(changer.user_id)

   recevier_ids.each do |receiver_id|
     IssueMailer.changed_notification(self, changer, receiver_id).deliver_later
   end
 end

 def ensure_state_at
   self.state_at = Time.current
 end
end
