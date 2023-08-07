class TestCasesAddGroupName < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.string :group_name, index: true
    end
  end
end
