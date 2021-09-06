class CreatePhases < ActiveRecord::Migration[6.1]
  class Plan < ActiveRecord::Base; end
  class Phase < ActiveRecord::Base; end
  def change
    create_table :phases do |t|
      t.belongs_to :plan, null: false, foreign_key: true
      t.string :title
      t.string :release_revision

      t.timestamps
    end

    Plan.all.each do |plan|
      Phase.create(plan_id: plan.id, title: "第 1 轮")
    end
  end
end
