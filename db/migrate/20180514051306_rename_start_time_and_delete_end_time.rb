class RenameStartTimeAndDeleteEndTime < ActiveRecord::Migration[5.2]
  def change
    rename_column :plans, :start_time, :start_at
    remove_column :plans, :end_time, :datetime
  end
end
