class AddLabelIdToIssueTemplates < ActiveRecord::Migration[6.1]
  def change
    add_reference :issue_templates, :default_label
  end
end
