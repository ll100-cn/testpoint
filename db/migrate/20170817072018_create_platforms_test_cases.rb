class CreatePlatformsTestCases < ActiveRecord::Migration[5.1]
  def change
    create_table :platforms_test_cases do |t|
      t.belongs_to :platform
      t.belongs_to :test_case
    end

    migrate_sql = <<-SQL
      INSERT INTO platforms_test_cases (platform_id, test_case_id)
      SELECT platform_id, id as test_case_id
      FROM test_cases
      WHERE test_cases.platform_id IS NOT NULL
    SQL

    ActiveRecord::Base.connection.execute(migrate_sql)
  end
end
