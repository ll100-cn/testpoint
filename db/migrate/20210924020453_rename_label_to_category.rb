class RenameLabelToCategory < ActiveRecord::Migration[6.1]
  class IssuesLabel < ActiveRecord::Base; end
  class Issue < ActiveRecord::Base; end

  def change
    rename_table :labels, :categories
    add_reference :issues, :category, index: true
    rename_column :issue_templates, :default_label_id, :default_category_id

    IssuesLabel.find_each do |issue_label|
      Issue.find(issue_label.issue_id).update(category_id: issue_label.label_id)
    end

    IssueActivity.where(property: "label_ids_cache").find_each do |activity|
      before_value = eval(activity.before_value).first
      after_value = eval(activity.after_value).first
      activity.update!(property: "category_id", before_value: before_value, after_value: after_value)
    end
  end
end
