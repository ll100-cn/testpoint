class AddArchivedToTestCases < ActiveRecord::Migration[5.1]
  def change
    change_table :test_cases do |t|
      t.boolean :archived, default: false, index: true
    end
  end
end
