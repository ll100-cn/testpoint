class CreateMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :members do |t|
      t.string :role
      t.belongs_to :project
      t.belongs_to :user
      t.timestamps
    end
  end
end
