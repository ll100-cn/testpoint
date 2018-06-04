class CreateIssuesLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :issues_labels do |t|
      t.belongs_to :issue, foreign_key: true
      t.belongs_to :label, foreign_key: true
      t.timestamps
    end
  end
end
