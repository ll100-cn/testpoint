class RemoveTokenFromTaskUpshots < ActiveRecord::Migration[6.1]
  def change
    remove_column :task_upshots, :token, :string
  end
end
