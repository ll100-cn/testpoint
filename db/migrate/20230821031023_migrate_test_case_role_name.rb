class MigrateTestCaseRoleName < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end
  class TestCase < ActiveRecord::Base; end

  def change
    TestCase.find_each do |test_case|
      Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').each do |version|
        next if version.old_object.nil?
        next if version.object['role_name']

        old_object = YAML.load(version.old_object)
        version.object['role_name'] = old_object['role_name']
        version.save! if version.changed?
      end
    end
  end
end
