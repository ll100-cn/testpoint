class AddLabelIdsToIssues < ActiveRecord::Migration[6.1]
  class Label < ActiveRecord::Base; end
  class Issue < ActiveRecord::Base; end
  class IssuesLabel < ActiveRecord::Base; end

  def change
    change_table :issues do |t|
      t.bigint :label_ids_cache, array: true, default: []
    end

    IssuesLabel.reset_column_information

    IssuesLabel.find_each do |issues_label|
      issue = Issue.find(issues_label.issue_id)
      issue.label_ids_cache << issues_label.label_id
      issue.save!
    end
  end
end
