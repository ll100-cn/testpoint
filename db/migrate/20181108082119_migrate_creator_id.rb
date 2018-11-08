class MigrateCreatorId < ActiveRecord::Migration[5.2]
  class Member < ActiveRecord::Base; end
  class Issue < ActiveRecord::Base; end

  def change
    change_table :issues do |t|
      t.rename :creator_id, :bak_creator_id
      t.rename :assignee_id, :bak_assignee_id
      t.belongs_to :creator, index: true, foreign_key: { to_table: :members }
      t.belongs_to :assignee, index: true, foreign_key: { to_table: :members }
    end

    Issue.find_each do |issue|
      creator = Member.where(user_id: issue.bak_creator_id, project_id: issue.project_id).take!
      issue.creator_id = creator.id

      assignee = Member.where(user_id: issue.bak_assignee_id, project_id: issue.project_id).take
      issue.assignee_id = assignee.id if assignee

      issue.save
    end
  end
end
