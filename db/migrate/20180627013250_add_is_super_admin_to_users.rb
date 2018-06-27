class AddIsSuperAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :role, :string
    add_column :users, :superadmin, :boolean, default: false
  end
end
