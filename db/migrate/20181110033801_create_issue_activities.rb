class CreateIssueActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_activities do |t|
      t.integer :issue_id, index: true, foreign_key: true
      t.integer :member_id, index: true, foreign_key: true
      t.string :property
      t.string :before_value
      t.string :after_value

      t.timestamps
    end
  end
end
