class IssuesAddStage < ActiveRecord::Migration[7.0]
  class Issue < ActiveRecord::Base; end

  def change
    change_table :issues do |t|
      t.string :stage, index: true
    end

    Issue.reset_column_information

    Issue.where(state: [ :pending, :waiting ]).update_all(stage: :pending)
    Issue.where(state: :confirmed).where(assignee_id: nil).update_all(stage: :pending)

    Issue.where(state: :confirmed).where.not(assignee_id: nil).update_all(stage: :developing)
    Issue.where(state: :processing).update_all(stage: :developing)
    Issue.where(state: :processed).update_all(stage: :testing)
    Issue.where(state: :deploying).update_all(stage: :deploying)
    Issue.where(state: :resolved).update_all(stage: :resolved)
    Issue.where(state: :closed).update_all(stage: :closed)
  end
end
