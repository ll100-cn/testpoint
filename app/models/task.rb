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

  has_many :task_attachments
  accepts_nested_attributes_for :task_attachments, allow_destroy: true

  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :component).includes(test_case: :component) }

  def completed?
    !pending?
  end
end
