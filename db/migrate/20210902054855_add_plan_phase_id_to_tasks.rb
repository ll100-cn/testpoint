class AddPlanPhaseIdToTasks < ActiveRecord::Migration[6.1]
  class Task < ActiveRecord::Base; end
  def change
    add_reference :tasks, :plan_phase, null: true, foreign_key: true

    Task.reset_column_information
    Plan.all.each do |plan|
      phase = PlanPhase.where(plan_id: plan.id).take
      Task.where(plan_id: plan.id).update_all(plan_phase_id: phase.id)
    end

    change_column_null :tasks, :plan_phase_id, false

  end
end
