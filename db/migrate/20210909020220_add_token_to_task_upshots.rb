class AddTokenToTaskUpshots < ActiveRecord::Migration[6.1]
  def change
    change_table :task_upshots do |t|
      t.string :token, index: { unique: true }
    end
  end
end
