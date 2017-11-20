class AddIssueIdToTasks < ActiveRecord::Migration[5.1]
  def change
    change_table :tasks do |t|
      t.belongs_to :issue
    end
  end
end
