class AddArchivedAtToIssues < ActiveRecord::Migration[6.1]
  class Issue < ActiveRecord::Base; end
  class IssueActivity < ActiveRecord::Base; end

  def change
    change_table :issues do |t|
      t.datetime :archived_at
    end

    Issue.reset_column_information
    Issue.where(state: :closed).find_each do |issue|
      activity = IssueActivity.where(issue_id: issue.id, property: "state", after_value: :closed).order(:id).last
      if activity
        issue.archived_at = activity.created_at
      else
        issue.archived_at = issue.last_edited_at || issue.updated_at
      end
      issue.save
    end

    Issue.where(state: :archived).find_each do |issue|
      activity = IssueActivity.where(issue_id: issue.id, property: "state", after_value: [ :closed, :resolved ]).order(:id).last

      if activity
        issue.archived_at = activity.created_at
        issue.state = activity.after_value
      else
        issue.archived_at = issue.last_edited_at || issue.updated_at
      end

      issue.save
    end
  end
end


