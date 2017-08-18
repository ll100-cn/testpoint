class CreatePlatformsTestCases < ActiveRecord::Migration[5.1]
  class TestCase < ActiveRecord::Base
  end

  class Task < ActiveRecord::Base
  end

  def change
    create_table :platforms_test_cases, id: false do |t|
      t.belongs_to :platform, foreign_key: true
      t.belongs_to :test_case, foreign_key: true
    end

    migrate_sql = <<-SQL
      INSERT INTO platforms_test_cases
        (platform_id, test_case_id)
      SELECT platform_id, id
      FROM test_cases
    SQL
    ActiveRecord::Base.connection.execute(migrate_sql)

    TestCase.order(:id).group_by(&:title).each do |(_, test_cases)|
      primary_case = test_cases.shift

      test_cases.each do |test_case|
        migrate_sql = <<-SQL
          UPDATE platforms_test_cases
          SET test_case_id=#{primary_case.id}
          WHERE test_case_id=#{test_case.id}
        SQL
        ActiveRecord::Base.connection.execute(migrate_sql)
        Task.where(test_case_id: test_case).update_all(test_case_id: primary_case)
        test_case.destroy
      end
    end
  end
end
