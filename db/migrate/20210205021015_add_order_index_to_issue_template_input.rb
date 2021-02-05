class AddOrderIndexToIssueTemplateInput < ActiveRecord::Migration[6.1]
  def change
    add_column :issue_template_inputs, :order_index, :integer
  end
end
