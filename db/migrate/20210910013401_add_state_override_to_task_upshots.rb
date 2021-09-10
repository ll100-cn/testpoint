class AddStateOverrideToTaskUpshots < ActiveRecord::Migration[6.1]
  def change
    change_table :task_upshots do |t|
      t.rename :state, :state_override
      t.string :state, index: true
    end
  end
end
