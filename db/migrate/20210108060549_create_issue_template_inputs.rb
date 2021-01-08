class CreateIssueTemplateInputs < ActiveRecord::Migration[6.0]
  def change
    create_table :issue_template_inputs do |t|
      t.references :template
      t.string :as
      t.string :label
      t.string :name
      t.boolean :required, default: false

      t.timestamps
    end
  end
end
