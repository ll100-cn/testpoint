class TestCaseAddPlatform2Ids < ActiveRecord::Migration[7.0]
  def change
    change_table :test_cases do |t|
      t.bigint :platform_ids, array: true, default: []
      t.bigint :label_ids, array: true, default: []
    end
  end
end
