class CreateTestCaseVersions < ActiveRecord::Migration[6.1]
  def change
    create_table :test_case_versions do |t|
      t.belongs_to :project, foreign_key: true
      t.string :title
      t.datetime :version_at
      t.text :description

      t.timestamps
    end
  end
end
