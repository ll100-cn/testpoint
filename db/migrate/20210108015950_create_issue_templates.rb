class CreateIssueTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :issue_templates do |t|
      t.string :name
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
