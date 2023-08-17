class MilestoneAddArchivedAt < ActiveRecord::Migration[7.0]
  def change
    change_table :milestones do |t|
      t.datetime :archived_at
    end
  end
end
