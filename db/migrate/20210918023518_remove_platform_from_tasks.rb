class RemovePlatformFromTasks < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :platform_id
  end
end
