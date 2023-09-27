class IssuesAddLegacyProjectIds < ActiveRecord::Migration[7.0]
  class Issue < ActiveRecord::Base; end
  class IssueActivity < ActiveRecord::Base; end

  def change
    change_table :issues do |t|
      t.integer :legacy_project_ids, array: true, default: [], index: true
    end

    Issue.reset_column_information
    IssueActivity.where(property: 'project_id').find_each do |activity|
      issue = Issue.find(activity.issue_id)

      legacy_project_ids = issue.legacy_project_ids
      legacy_project_ids << activity.before_value
      legacy_project_ids << activity.after_value
      legacy_project_ids = legacy_project_ids.compact.uniq

      issue.update_column(:legacy_project_ids, legacy_project_ids)
    end
  end
end
