class CreateRequirements < ActiveRecord::Migration[7.0]
  def change
    create_table :requirements do |t|
      t.belongs_to :project, foreign_key: true, null: false

      t.bigint :platform_ids, array: true, default: []
      t.bigint :upstream_ids, array: true, default: []

      t.string :title
      t.text :description
      t.string :roles, array: true, default: []

      t.timestamps
    end
  end
end
