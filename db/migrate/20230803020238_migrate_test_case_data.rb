class MigrateTestCaseData < ActiveRecord::Migration[7.0]
  class TestCase < ActiveRecord::Base; end
  class Folder < ActiveRecord::Base
    def parent_id
      ancestry.present? ? ancestry.split('/').last.to_i : nil
    end
  end
  class Version < ActiveRecord::Base; end
  class Project < ActiveRecord::Base; end

  def change
    Project.find_each do |project|
      folder_repo = Folder.where(project_id: project.id).index_by(&:id)

      available_mapping = {}
      archived_mapping = {}

      folder_repo.values.each do |folder|
        ancestors = find_ancestors(folder_repo, folder)
        ancestors_with_self = ancestors + [folder]

        if ancestors_with_self[0].syscode == 'ARCHIVED_ROOT'
          archived_mapping[folder.id] = ancestors_with_self.map(&:name)[1..-1].join(' | ')
        else
          available_mapping[folder.id] = ancestors_with_self.map(&:name).join(' | ')
        end
      end

      archived_mapping.each do |folder_id, scene_name|
        TestCase.where(folder_id: folder_id).update_all(scene_name: scene_name, archived: true)
      end

      available_mapping.each do |folder_id, scene_name|
        TestCase.where(folder_id: folder_id).update_all(scene_name: scene_name)
      end

      TestCase.where(project_id: project.id).find_each do |test_case|
        Version.where(item_type: 'TestCase', item_id: test_case.id, event: 'update').find_each do |version|
          attrs = YAML.load(version.object)
          folder_id = attrs['folder_id']
          next if folder_id.nil?

          if available_mapping.key?(folder_id)
            scene_name = available_mapping[folder_id]
            attrs['scene_name'] = scene_name
            version.update(object: YAML.dump(attrs))
          end

          if archived_mapping.key?(folder_id)
            scene_name = archived_mapping[folder_id]
            attrs['scene_name'] = scene_name
            attrs['archived'] = true
            version.update(object: YAML.dump(attrs))
          end
        end
      end
    end
  end

  def find_ancestors(folder_repo, folder)
    if folder.parent_id
      parent = folder_repo[folder.parent_id]
      find_ancestors(folder_repo, parent) + [parent]
    else
      []
    end
  end
end
