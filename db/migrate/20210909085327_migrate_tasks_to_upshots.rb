class MigrateTasksToUpshots < ActiveRecord::Migration[6.1]
  class Task < ActiveRecord::Base; end
  class Issue < ActiveRecord::Base; end
  class TaskUpshot < ActiveRecord::Base; end

  def change
    plan_ids = Task.distinct.pluck(:plan_id)
    plan_ids.each do |plan_id|
      task_infos = Task.where(plan_id: plan_id).distinct.pluck(:test_case_id, :platform_id)
      task_infos.each do |(test_case_id, platform_id)|
        tasks = Task.where(plan_id: plan_id, test_case_id: test_case_id, platform_id: platform_id).order(:phase_id)
        next if tasks.empty?

        first_task = tasks.first
        prev_state = 'pending'

        tasks.each_with_index do |task, index|
          token = "#{first_task.id}-#{task.phase_id}"
          upshot = TaskUpshot.where(token: token).first_or_initialize
        
          upshot.task_id = first_task.id
          upshot.phase_id = task.phase_id
          upshot.content = task.content
          upshot.created_at = task.created_at
          upshot.updated_at = task.updated_at

          if prev_state != task.state
            upshot.state = task.state
            upshot.state_changed_at = task.updated_at
          end


          if upshot.content || upshot.state
            upshot.record_timestamps = false
            upshot.save!
          end

          prev_state = upshot.state || prev_state
          if index != 0
            Issue.where(task_id: task.id).update_all(task_id: first_task.id)
            task.destroy
          end
        end
      end
    end

  end
end
