class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, index: true
      t.integer :issue_id, index: true
      t.timestamps
    end
  end
end
