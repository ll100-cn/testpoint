class AddReferenceToComment < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :user_id, :bigint
    remove_column :comments, :issue_id, :bigint
    add_reference :comments, :user, foreign_key: true
    add_reference :comments, :issue, foreign_key: true
  end
end
