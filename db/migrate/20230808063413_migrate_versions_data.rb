class MigrateVersionsData < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end
  class TestCase < ActiveRecord::Base; end

  def change
    TestCase.find_each do |test_case|
      Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').each do |version|
        version.object['role_name'] = nil
        version.object.delete('folder_id')
        version.save! if version.changed?
      end
    end
  end
end
