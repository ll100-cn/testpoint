class CreateTestCaseRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :test_case_records do |t|
      t.belongs_to :test_case, foreign_key: true
      t.datetime :changed_at

      t.timestamps
    end

    TestCase.find_each do |test_case|
      test_case.versions.find_each do |version|
        test_case.test_case_records.create!(changed_at: version.reify.updated_at) if version.reify&.updated_at
      end
    end
  end
end
