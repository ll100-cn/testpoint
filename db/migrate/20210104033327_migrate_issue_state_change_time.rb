class MigrateIssueStateChangeTime < ActiveRecord::Migration[6.0]
  class Issue < ActiveRecord::Base; end
  class IssueActivity < ActiveRecord::Base; end

  def up
    change_table :issues do |t|
      t.datetime :resolved_at
      t.datetime :closed_at
    end
    Issue.reset_column_information

    Issue.find_each do |issue|
      activities = IssueActivity.where(issue_id: issue.id)
      issue.confirmed_at = activities.where(property: "state").where(after_value: "confirmed").order(:created_at).last&.created_at
      issue.processing_at = activities.where(property: "state").where(after_value: "processing").order(:created_at).last&.created_at
      issue.processed_at = activities.where(property: "state").where(after_value: "processed").order(:created_at).last&.created_at
      issue.closed_at = activities.where(property: "state").where(after_value: "closed").order(:created_at).last&.created_at
      issue.resolved_at = activities.where(property: "state").where(after_value: "resolved").order(:created_at).last&.created_at
      issue.assigned_at = activities.where(property: "assignee_id").where.not(after_value: nil).order(:created_at).last&.created_at

      issue.save!
    end
  end

  def down
    Issue.update_all(assigned_at: nil, processed_at: nil, processing_at: nil, confirmed_at: nil, closed_at: nil, resolved_at: nil)
    remove_columns :issues, :resolved_at, :closed_at
  end
end
