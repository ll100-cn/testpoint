class RemoveRequiredFromIssueTemplateInputs < ActiveRecord::Migration[6.0]
  def change
    change_table :issue_template_inputs do |t|
      t.remove :required
      t.remove :name
      t.remove :as
    end
  end
end
