class AddHiddenToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :collapsed, :boolean, default: false
  end
end
