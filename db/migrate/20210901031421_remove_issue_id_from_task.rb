class RemoveIssueIdFromTask < ActiveRecord::Migration[6.1]
  class Issue < ActiveRecord::Base; end
  class Task < ActiveRecord::Base; end
  def change
    add_reference :issues, :task, null: true, foreign_key: true

    Issue.reset_column_information

    Task.where.not(issue_id: nil) do |task|
      issue = Issue.find_by(task.issue_id)
      issue.update(task_id: task.id)
    end
  
    remove_column :tasks, :issue_id
  end
end
