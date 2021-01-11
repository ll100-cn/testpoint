class AddRemarkToIssueForms < ActiveRecord::Migration[6.0]
  def change
    add_column :issue_forms, :remark, :string
  end
end
