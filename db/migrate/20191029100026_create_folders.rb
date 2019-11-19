class CreateFolders < ActiveRecord::Migration[6.0]
  class Folder < ActiveRecord::Base; end
  class Component < ActiveRecord::Base; end

  def change
    create_table :folders do |t|
      t.string :name
      t.string :ancestry
      t.boolean :archived, default: false, index: true
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
    add_index :folders, :ancestry

    Component.all.each do |c|
      f = Folder.new
      f.name = c.name
      f.ancestry = c.ancestry
      f.archived = c.archived
      f.project_id = c.project_id
      f.save!
    end

    drop_table :components

    rename_column :test_cases, :component_id, :folder_id
  end
end
