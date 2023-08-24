class PlansAddRoleName < ActiveRecord::Migration[7.0]
  def change
    change_table :plans do |t|
      t.string :role_name
    end
  end
end
