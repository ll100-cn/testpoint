class CreateMilestones < ActiveRecord::Migration[5.2]
  def change
    create_table :milestones do |t|
      t.string :title
      t.datetime :due_date
      t.text :description
      t.timestamps
    end
  end
end
