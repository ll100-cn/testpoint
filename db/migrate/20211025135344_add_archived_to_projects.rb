class AddArchivedToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :archived, :boolean, default: false
  end
end
