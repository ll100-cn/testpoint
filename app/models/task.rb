# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  test_case_id :integer
#  plan_id      :integer
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  platform_id  :integer
#  issue_id     :integer
#  message      :text
#

class Task < ApplicationRecord
  extend Enumerize

  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
  belongs_to :platform
  belongs_to :issue, optional: true

  # has_many :task_attachments, dependent: :destroy
  # accepts_nested_attributes_for :task_attachments, allow_destroy: true
  has_many :attachments, as: :attachmentable
  accepts_nested_attributes_for :attachments, allow_destroy: true

  validate :issue_must_exist, if: -> { issue_id.present? }

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :component).includes(test_case: :component) }

  def issue_must_exist
    errors.add(:issue_id, :invalid) if Issue.where(id: issue_id).none?
  end
end
