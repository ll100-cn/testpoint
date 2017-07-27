class RenameTitleToNameFromComponents < ActiveRecord::Migration[5.1]
  def change
    rename_column :components, :title, :name
  end
end
