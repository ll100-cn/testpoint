class CreateTestCaseLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :test_case_labels do |t|
      t.string :name
      t.text :description
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
