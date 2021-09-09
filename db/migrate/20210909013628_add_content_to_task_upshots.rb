class AddContentToTaskUpshots < ActiveRecord::Migration[6.1]
  def change
    add_column :task_upshots, :content, :text
  end
end
