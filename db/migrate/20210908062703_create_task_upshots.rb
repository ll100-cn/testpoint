class CreateTaskUpshots < ActiveRecord::Migration[6.1]
  def change
    create_table :task_upshots do |t|
      t.belongs_to :task, null: false, foreign_key: true, index: true
      t.belongs_to :phase, null: false, foreign_key: true, index: true
      t.string :state
      t.datetime :state_changed_at

      t.timestamps
    end
  end
end
