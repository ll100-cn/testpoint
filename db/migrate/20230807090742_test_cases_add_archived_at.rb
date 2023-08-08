class TestCasesAddArchivedAt < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.datetime :archived_at, index: true
    end
  end
end
