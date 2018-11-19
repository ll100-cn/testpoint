class CreateIssueRelationship < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_relationships do |t|
      t.belongs_to :target, index: true, foreign_key: { to_table: :issues }
      t.belongs_to :source, index: true, foreign_key: { to_table: :issues }
      t.belongs_to :member, index: true, foreign_key: true
      t.string :category
      t.timestamps
    end
  end
end
