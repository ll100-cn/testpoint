class AddComponentIdToTestCases < ActiveRecord::Migration[5.1]
  def change
    change_table :test_cases do |t|
      t.belongs_to :component
    end
  end
end
