class AddPublishedOnToMilestones < ActiveRecord::Migration[6.0]
  class Milestone < ActiveRecord::Base; end

  def change
    rename_column :milestones, :end_time, :published_at
    remove_column :milestones, :start_time, :datetime
  end
end
