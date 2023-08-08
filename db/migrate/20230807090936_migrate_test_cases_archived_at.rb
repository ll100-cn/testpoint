class MigrateTestCasesArchivedAt < ActiveRecord::Migration[7.0]
  class TestCase < ActiveRecord::Base; end
  class Version < ActiveRecord::Base; end

  def change
    # TestCase.where(project_id: project.id).find_each do |test_case|
    #     Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').find_each do |version|
    #       attrs = YAML.load(version.object)
    #       folder_id = attrs['folder_id']
    #       next if folder_id.nil?

    #       if available_mapping.key?(folder_id)
    #         scene_name = available_mapping[folder_id]
    #         attrs['scene_name'] = scene_name
    #         version.update(object: YAML.dump(attrs))
    #       end

    #       if archived_mapping.key?(folder_id)
    #         scene_name = archived_mapping[folder_id]
    #         attrs['scene_name'] = scene_name
    #         attrs['archived'] = true
    #         version.update(object: YAML.dump(attrs))
    #       end
    #     end
    #   end

    TestCase.where(archived: true, archived_at: nil).find_each do |test_case|
      versions = Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').order('created_at DESC')

      action_record = versions.detect do |version|
        attrs = YAML.load(version.object)
        attrs['archived'] === false
      end

      if action_record
        test_case.update(archived_at: action_record.created_at)
      end
    end

    TestCase.where(archived: true, archived_at: nil).update_all("archived_at = updated_at")

    TestCase.find_each do |test_case|
      versions = Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').order('created_at DESC')
      archived_at = test_case.archived_at

      versions.each do |version|
        attrs = YAML.load(version.object)
        if attrs['archived'] === true
          if archived_at
            attrs['archived_at'] = archived_at.to_s(:db)
            version.update(object: YAML.dump(attrs))
          else
            archived_at = version.created_at
            attrs['archived_at'] = archived_at.to_s(:db)
            version.update(object: YAML.dump(attrs))
          end
        end

        if attrs['archived'] === false
          if archived_at
            archived_at = nil
            attrs['archived_at'] = nil
            version.update(object: YAML.dump(attrs))
          else
            attrs['archived_at'] = nil
            version.update(object: YAML.dump(attrs))
          end
        end
      end
    end
  end
end
