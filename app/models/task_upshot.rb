# == Schema Information
#
# Table name: task_upshots
#
#  id               :bigint           not null, primary key
#  task_id          :bigint           not null
#  phase_id         :bigint           not null
#  state_override   :string
#  state_changed_at :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  content          :text
#  state            :string
#
class TaskUpshot < ApplicationRecord
  belongs_to :task
  belongs_to :phase
  attr_accessor :issue

  enumerize :state, in: [ :pending, :pass, :failure ]
  enumerize :state_override, in: [ :pending, :pass, :failure ]

  validates :phase_id, uniqueness: { scope: :task_id }
  validates :state_override, presence: true, on: :submit

  scope :state_modify_is, ->(value) { value == "overrided" ? where.not(state_override: nil) : where(state_override: nil) }

  def do_submit_for_failure(author)
    self.state = self.state_override
    self.state_changed_at = Time.current
    raise ActiveRecord::Rollback if !self.save(context: :submit)

    self.issue.project = @plan.project
    self.issue.task = task
    self.issue.creator = author
    self.issue.category = @plan.project.categories.where(default_as_test_failure: true).take

    if !self.issue.save
      self.errors.add(:issue, :invalid)
      raise ActiveRecord::Rollback
    end

    self.task.state = self.state
    if !self.task.save
      self.errors.add(:task_id, self.task.errors.full_messages.first)
      raise ActiveRecord::Rollback
    end
  end

  def do_submit_for_not_failure(author)
    self.state = self.state_override
    self.state_changed_at = Time.current
    raise ActiveRecord::Rollback if !self.save(context: :submit)

    self.task.state = self.state
    if !self.task.save
      self.errors.add(:task_id, self.task.errors.full_messages.first)
      raise ActiveRecord::Rollback
    end
  end

  def submit(params, author)
    assign_attributes(params)
    return false if !valid?(:submit)

    @plan = task.plan
    if @plan.phases.where("id > ?", self.phase_id).exists?
      self.errors.add(:state, "当前轮次已过期，无法更改")
      return false
    end

    transaction do
      if self.state_override.failure?
        do_submit_for_failure(author)
      else
        do_submit_for_not_failure(author)
      end
    end

    self.errors.empty?
  end

  def issue_attributes=(attrs)
    self.issue = Issue.new(attrs)
  end

  def self.ransackable_scopes(auth_object = nil)
    [ :state_modify_is ]
  end
end
