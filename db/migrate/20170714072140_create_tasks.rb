class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.belongs_to :test_case
      t.belongs_to :plan
      t.string :state

      t.timestamps
    end
  end
end
