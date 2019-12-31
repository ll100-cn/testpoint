class CreateTestCaseLabelLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :test_case_label_links do |t|
      t.belongs_to :test_case_label, null: false, foreign_key: true
      t.belongs_to :test_case, null: false, foreign_key: true

      t.timestamps
    end
  end
end
