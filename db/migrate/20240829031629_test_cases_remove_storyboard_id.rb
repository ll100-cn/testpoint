class TestCasesRemoveStoryboardId < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.remove :storyboard_id
    end
  end
end
