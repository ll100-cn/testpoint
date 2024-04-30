class MigrateIssueStage < ActiveRecord::Migration[7.0]
  class Issue < ActiveRecord::Base; end

  def change
    Issue.where(stage: :testing).update_all(stage: :deploying)
  end
end
