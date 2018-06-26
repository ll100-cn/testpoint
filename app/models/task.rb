# == Schema Information
#
# Table name: tasks
#
#  id           :bigint(8)        not null, primary key
#  test_case_id :bigint(8)
#  plan_id      :bigint(8)
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  platform_id  :bigint(8)
#  issue_id     :bigint(8)
#  message      :text
#

class Task < ApplicationRecord
  include MarkdownConvertor
  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
  belongs_to :platform
  belongs_to :issue, optional: true

  has_many :task_attachments, dependent: :destroy
  accepts_nested_attributes_for :task_attachments, allow_destroy: true
  has_many :attachments, as: :attachmentable, through: :task_attachments, dependent: :destroy

  validate :issue_must_exist, if: -> { issue_id.present? }

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :component).includes(test_case: :component) }

  def issue_must_exist
    errors.add(:issue_id, :invalid) if Issue.where(id: issue_id).none?
  end
end
