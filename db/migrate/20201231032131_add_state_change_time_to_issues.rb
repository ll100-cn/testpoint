class AddStateChangeTimeToIssues < ActiveRecord::Migration[6.0]
  def change
    change_table :issues do |t|
      t.datetime :assigned_at
      t.datetime :confirmed_at
      t.datetime :processing_at
      t.datetime :processed_at
    end
  end
end
