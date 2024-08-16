class TestCasesAddRoadmpas < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.belongs_to :roadmap, null: true, foreign_key: true
      t.belongs_to :storyboard, null: true, foreign_key: true
      t.belongs_to :requirement, null: true, foreign_key: true
    end
  end
end
