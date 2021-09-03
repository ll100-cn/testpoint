class CreatePlanPhases < ActiveRecord::Migration[6.1]
  class PlanPhase < ActiveRecord::Base; end
  class Plan < ActiveRecord::Base; end
  def change
    create_table :plan_phases do |t|
      t.string :title
      t.belongs_to :plan, null: false, foreign_key: true

      t.timestamps
    end

    Plan.all.each do |plan|
      PlanPhase.where(plan_id: plan, title: "1").first_or_create!
    end
  end
end
