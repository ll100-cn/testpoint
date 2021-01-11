class CreateIssueForms < ActiveRecord::Migration[6.0]
  def change
    create_table :issue_forms do |t|
      t.belongs_to :issue, null: false, foreign_key: true
      t.belongs_to :template, null: false, foreign_key: { to_table: :issue_templates }
      t.string :state
      t.json :values, default: {}

      t.timestamps
    end
  end
end
