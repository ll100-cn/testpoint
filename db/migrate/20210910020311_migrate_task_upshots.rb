class MigrateTaskUpshots < ActiveRecord::Migration[6.1]
  class Task < ActiveRecord::Base; end
  class TaskUpshot < ActiveRecord::Base; end
  class Phase < ActiveRecord::Base; end

  def up
    TaskUpshot.reset_column_information
    Task.find_each do |task|
      phases = Phase.where(plan_id: task.plan_id).order(:index)
      prev_upshot = nil
      phases.each_with_index do |phase, index|
        upshot = TaskUpshot.where(phase_id: phase.id, task_id: task.id).first_or_initialize
        upshot.state = upshot.state_override || prev_upshot&.state || "pending"
        upshot.token = "#{task.id}-#{phase.id}"
        upshot.created_at = phase.created_at
        upshot.updated_at = phase.updated_at

        upshot.record_timestamps = false
        upshot.save!
        prev_upshot = upshot
      end
    end

  end

  def down
    raise NotImplementedError
  end
end
