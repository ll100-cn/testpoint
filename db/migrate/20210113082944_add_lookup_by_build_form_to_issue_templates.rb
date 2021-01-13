class AddLookupByBuildFormToIssueTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :issue_templates, :lookup_by_build_form, :boolean, default: true
  end
end
