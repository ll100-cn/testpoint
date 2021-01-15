class AddTitleSuggestionToIssueTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :issue_templates, :title_suggestion, :string
    add_column :issue_templates, :content_suggestion, :string
  end
end
