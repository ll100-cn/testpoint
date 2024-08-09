class RequirementAddLabels < ActiveRecord::Migration[7.0]
  def change
    change_table :requirements do |t|
      t.bigint :label_ids, array: true, default: []
      t.json :label_descriptions, default: {}
    end
  end
end
