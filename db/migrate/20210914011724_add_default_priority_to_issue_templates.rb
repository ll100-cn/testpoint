class AddDefaultPriorityToIssueTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :issue_templates, :default_priority, :string
  end
end
