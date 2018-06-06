class AddStartTimeToMilestone < ActiveRecord::Migration[5.2]
  def change
    rename_column :milestones, :due_date, :end_time
    add_column :milestones, :start_time, :datetime
  end
end
