class RemoveIssueStateChangeTime < ActiveRecord::Migration[6.0]
  def change
    change_table :issues do |t|
      t.remove :assigned_at
      t.remove :confirmed_at
      t.remove :processing_at
      t.remove :processed_at
      t.remove :state_at
    end
  end
end
