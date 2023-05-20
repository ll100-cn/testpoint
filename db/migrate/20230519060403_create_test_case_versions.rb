class CreateTestCaseVersions < ActiveRecord::Migration[6.1]
  def change
    create_table :test_case_versions do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end

    create_table :versionables do |t|
      t.belongs_to :test_case_version, null: false, foreign_key: true
      t.belongs_to :test_case, null: false, foreign_key: true

      t.integer :history_id

      t.string :category
      t.datetime :case_updated_at

      t.timestamps
    end
  end
end
