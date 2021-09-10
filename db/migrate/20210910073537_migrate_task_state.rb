class MigrateTaskState < ActiveRecord::Migration[6.1]
  class Plan < ActiveRecord::Base; end
  class Task < ActiveRecord::Base; end
  class TaskUpshot < ActiveRecord::Base; end
  class Phase < ActiveRecord::Base; end

  def up
    Plan.find_each do |plan|
      last_phase = Phase.where(plan_id: plan.id).order(id: :desc).first
      TaskUpshot.where(phase_id: last_phase.id).each do |task_upshot|
        Task.where(task_upshot.task_id).update_all(state: task_upshot.state)
      end
    end
  end

  def down
    raise NotImplementedError
  end
end
