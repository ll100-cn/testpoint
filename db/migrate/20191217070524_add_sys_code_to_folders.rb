class AddSysCodeToFolders < ActiveRecord::Migration[6.0]
  def change
    add_column :folders, :syscode, :string, index: true
  end
end
