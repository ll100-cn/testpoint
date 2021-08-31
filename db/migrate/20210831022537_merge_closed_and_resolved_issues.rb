class MergeClosedAndResolvedIssues < ActiveRecord::Migration[6.1]
  class Issue < ActiveRecord::Base; end

  def change
    Issue.where(state: :closed).update_all(state: :resolved)
  end
end
