class MigrateVersionChanges < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end
  class TestCase < ActiveRecord::Base; end

  def change
    Version.where(item_type: 'TestCase').find_each do |version|
      next if version.object.nil?

      if version.object.key?('test_platform_ids')
        version.object.delete('test_platform_ids')
      end

      if version.object.key?('platform2_ids')
        version.object.delete('platform2_ids')
      end

      if version.object.key?('folder_id')
        version.object.delete('folder_id')
      end

      version.save if version.changed?
    end


    TestCase.find_each do |test_case|
      versions = Version.where(item_type: 'TestCase', item_id: test_case.id).order('created_at DESC').to_a

      last = test_case
      versions.each do |version|
        curr_test_case = TestCase.new
        curr_test_case.assign_attributes(last.attributes)
        prev_test_case = TestCase.new
        prev_test_case.assign_attributes(version.object || {})

        curr_changes = curr_test_case.changes
        prev_changes = prev_test_case.changes

        new_changes = {}
        prev_changes.each do |key, value|
          new_changes[key] ||= []
          new_changes[key][0] = value[1]
        end

        curr_changes.each do |key, value|
          new_changes[key] ||= []
          new_changes[key][1] = value[1]
        end

        new_changes = new_changes.filter do |key, value|
          value[0] != value[1]
        end

        version.object_changes = new_changes
        version.save!

        last = prev_test_case
      end
    end
  end
end
