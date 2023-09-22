class IssueStageAddArchived < ActiveRecord::Migration[7.0]
  class Issue < ActiveRecord::Base; end

  def change
    Issue.where.not(archived_at: nil).update_all(stage: :archived)
  end
end
