class VersionsAddNewObject < ActiveRecord::Migration[7.0]
  class Version < ActiveRecord::Base; end

  def change
    change_table :versions do |t|
      t.rename :object, :old_object
      t.json :object
    end

    Version.reset_column_information

    Version.find_each do |version|
      if version.old_object
        version.update(object: YAML.load(version.old_object))
      end
    end
  end
end
