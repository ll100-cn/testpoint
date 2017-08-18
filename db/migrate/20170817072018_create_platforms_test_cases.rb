class CreatePlatformsTestCases < ActiveRecord::Migration[5.1]
  class TestCase < ActiveRecord::Base
  end

  def change
    create_table :platforms_test_cases, id: false do |t|
      t.belongs_to :platform
      t.belongs_to :test_case
    end

    TestCase.all.group_by(&:title).each do |(_, test_cases)|
      test_case_id = test_cases.sort_by(&:id).first.id
      test_cases.each do |test_case|
        next if test_case.platform_id.nil?

        migrate_sql = <<-SQL
          INSERT INTO platforms_test_cases (platform_id, test_case_id)
          VALUES (#{test_case.platform_id}, #{test_case_id})
        SQL
        ActiveRecord::Base.connection.execute(migrate_sql)
        test_case.update(platform_id: nil) if test_case.id != test_case_id
      end

      TestCase.where(platform_id: nil).destroy_all
    end
  end
end
