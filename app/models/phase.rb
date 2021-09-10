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
  has_many :task_upshots, dependent: :destroy

  scope :ranked, -> { order("index") }

  validates :index, uniqueness: { scope: :plan_id }
  validates :title, presence: true


 def submit
    self.index = plan.phases.count

    transaction do
      raise ActiveRecord::Rollback unless save

      prev_upshot_mapping = (prev_phase&.task_upshots || []).index_by(&:task_id)
      plan.tasks.each do |task|
        prev_upshot = prev_upshot_mapping[task.id]
        upshot = self.task_upshots.new(task: task, state: prev_upshot&.state || :pending)
        if !save
          errors.add(:task_upshots, upshot.errors.full_messages.first)
          raise ActiveRecord::Rollback
        end
      end
    end

    self.errors.empty?
  end

  def prev_phase
    @prev_phase ||= plan.phases.where("id < ?", self.id).order(id: :desc).take
  end

  def set_default_value
    i = plan.phases.maximum("index") + 1
    self.title ||= "第 #{i + 1} 轮"
  end
end
