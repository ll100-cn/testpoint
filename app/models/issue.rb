# == Schema Information
#
# Table name: issues
#
#  id             :bigint(8)        not null, primary key
#  title          :string
#  content        :text
#  state          :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  milestone_id   :bigint(8)
#  creator_id     :bigint(8)
#  assignee_id    :bigint(8)
#  project_id     :bigint(8)
#  last_edited_at :datetime
#

class Issue < ApplicationRecord
  enumerize :state, in: [:pending, :processing, :closed, :resolved], default: :pending

  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :issues_labels, dependent: :destroy
  has_many :labels, through: :issues_labels
  belongs_to :milestone, optional: true
  belongs_to :creator, class_name: User.to_s
  belongs_to :assignee, class_name: User.to_s, optional: true
  belongs_to :project

  has_many :issue_attachments, dependent: :destroy
  accepts_nested_attributes_for :issue_attachments, allow_destroy: true
  has_many :attachments, as: :attachmentable, through: :issue_attachments, dependent: :destroy

  validates :title, presence: true

  before_save :update_edited_at, if: -> { will_save_change_to_content? && !new_record? }

  scope :with_labels, -> { includes(:labels) }
  scope :created_issues, ->(user) { where(creator_id: user.id) }
  scope :assigned_issues, ->(user) { where(assignee_id: user.id) }
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
      "#{test_case.component.name}-#{test_case.title}"
    end.join(" ")
  end

  def default_content
    tasks.map(&:message).join(" ")
  end

  def self.ransackable_scopes(auth_object = nil)
   [ :state_filter ]
 end

 def update_edited_at
   self.last_edited_at = Time.current
 end
end
