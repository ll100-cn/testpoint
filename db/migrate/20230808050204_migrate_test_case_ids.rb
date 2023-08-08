class MigrateTestCaseIds < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end
  class TestCase < ActiveRecord::Base; end
  class PlatformLink < ActiveRecord::Base
    self.table_name = 'platforms_test_cases'
  end
  class LableLink < ActiveRecord::Base
    self.table_name = 'test_case_label_links'
  end

  def change
    TestCase.find_each do |test_case|
      platform_ids = PlatformLink.where(test_case_id: test_case.id).pluck(:platform_id)
      label_ids = LableLink.where(test_case_id: test_case.id).pluck(:test_case_label_id)

      TestCase.where(id: test_case.id).update_all(platform_ids: platform_ids, label_ids: label_ids)
    end

    TestCase.find_each do |test_case|
      Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').find_each do |version|
        version.object['platform_ids'] = test_case.platform_ids
        version.object['label_ids'] = test_case.label_ids
        version.save!
      end
    end

    TestCase.find_each do |test_case|
      version = Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'create').first_or_initialize
      next unless version.new_record?

      version.created_at = test_case.created_at
      version.save!

      version.transaction_id = version.id
      version.save!
    end
  end
end
