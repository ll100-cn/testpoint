class AddPlatformIdToTasks < ActiveRecord::Migration[5.1]
  def change
    change_table :tasks do |t|
      t.belongs_to :platform, foreign_key: true
    end

    migrate_sql = <<-SQL
      UPDATE tasks
      SET platform_id=test_cases.platform_id
      FROM test_cases
      WHERE tasks.test_case_id=test_cases.id
    SQL
    ActiveRecord::Base.connection.execute(migrate_sql)
  end
end
