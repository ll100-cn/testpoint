# == Schema Information
#
# Table name: task_upshots
#
#  id               :bigint           not null, primary key
#  task_id          :bigint           not null
#  phase_id         :bigint           not null
#  state            :string
#  state_changed_at :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  content          :text
#  token            :string
#
class TaskUpshot < ApplicationRecord
  belongs_to :task
  belongs_to :phase
  attr_accessor :issue

  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  validates :phase_id, uniqueness: { scope: :task_id }

  def do_submit_for_failure(author)
    self.state_changed_at = Time.current
    raise ActiveRecord::Rollback if !self.save
    
    self.issue.project = @plan.project
    self.issue.task = task
    self.issue.creator = author

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
    self.state_changed_at = Time.current
    raise ActiveRecord::Rollback if !self.save

    self.task.state = self.state
    if !self.task.save
      self.errors.add(:task_id, self.task.errors.full_messages.first)
      raise ActiveRecord::Rollback
    end
  end

  def submit(params, author)
    assign_attributes(params)
    return false if !valid?

    @plan = task.plan
    if @plan.phases.where("id > ?", self.phase_id).exists?
      self.errors.add(:state, "当前轮次已过期，无法更改")
      return false
    end

    transaction do
      if self.state.failure?
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

  def self.build_token(task, phase)
    "#{task.id}-#{phase.id}"
  end

  def self.find_phase_by_token(task, token)
    _, phase_id = *token.split("-")
    task.plan.phases.find(phase_id)
  end

  def self.fetch_by_token(token)
    record = where(token: token).first_or_initialize
    record.phase = find_phase_by_token(record.task, token) if record.new_record?
    record
  end
end
