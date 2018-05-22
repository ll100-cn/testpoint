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

  validate :issue_must_exist, if: -> { issue_id.present? }

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :component).includes(test_case: :component) }

  def completed?
    !pending?
  end

  def pending?
    state == "pending"
  end

  def issue_must_exist
    if Issue.where(id: issue_id).none?
      errors.add(:issue_id, :invalid)
    end
  end

  # def self.tasks_count_mapping(plan)
  #   tasks = Task.joins(:plan).merge(plan).select(:plan_id, :state, "count(1) AS count").group(:plan_id, :state)
  #   tasks.each_with_object({}) do |task, result|
  #     result[task.plan_id] ||= {}
  #     result[task.plan_id][task.state] = task.count
  #   end
  # end
end
