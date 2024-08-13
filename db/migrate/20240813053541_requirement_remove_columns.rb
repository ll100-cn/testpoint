class RequirementRemoveColumns < ActiveRecord::Migration[7.0]
  def change
    change_table :requirements do |t|
      t.remove :platform_ids
      t.remove :upstream_ids
      t.remove :label_ids
      t.remove :label_descriptions
      t.remove :title
      t.remove :description
      t.remove :roles
    end
  end
end
