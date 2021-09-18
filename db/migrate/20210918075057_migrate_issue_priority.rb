class MigrateIssuePriority < ActiveRecord::Migration[6.1]
  class Issue < ActiveRecord::Base; end
  def change
    Issue.where("priority = ?", 'important').update_all(priority: 'p0_important')
    Issue.where("priority = ?", 'normal').update_all(priority: 'p1_normal')
    Issue.where("priority = ?", 'low').update_all(priority: 'p2_low')
  end
end
