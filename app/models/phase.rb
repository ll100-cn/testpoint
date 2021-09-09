# == Schema Information
#
# Table name: phases
#
#  id               :bigint           not null, primary key
#  plan_id          :bigint           not null
#  title            :string
#  release_revision :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  index            :integer
#
class Phase < ApplicationRecord
  belongs_to :plan
  has_many :tasks, dependent: :destroy
  has_many :task_upshots

  scope :ranked, -> { order("index") }

  validates :index, uniqueness: { scope: :plan_id }


  def assign_tasks
  end

  def submit
    save
  end

  def previous_phase
    plan.phases.where.not(id: self.id).ranked.last
  end

  def final_phase?
    previous_phase.all_task_passed?
  end

  def all_task_passed?
    tasks.where.not(state: :pass).empty?
  end

  def set_default_value
    self.index ||= plan.phases.maximum("index") + 1
    self.title ||= final_phase? ? "最终测试" : "第 #{index + 1} 轮"
  end
end
