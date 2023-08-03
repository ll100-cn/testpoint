class TestCasesAddColumns < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.string :role_name
      t.string :scene_name
    end
  end
end
