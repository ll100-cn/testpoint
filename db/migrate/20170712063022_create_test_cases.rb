class CreateTestCases < ActiveRecord::Migration[5.1]
  def change
    create_table :test_cases do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
