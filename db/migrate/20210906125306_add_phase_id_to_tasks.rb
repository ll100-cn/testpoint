class AddPhaseIdToTasks < ActiveRecord::Migration[6.1]
  class Phase < ActiveRecord::Base; end
  class Task < ActiveRecord::Base; end
  def change
    add_reference :tasks, :phase, null: true, foreign_key: true

    Phase.all.each do |phase|
      Task.where(plan_id: phase.plan_id).update_all(phase_id: phase.id)
    end
  end
end
