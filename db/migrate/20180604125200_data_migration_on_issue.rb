class DataMigrationOnIssue < ActiveRecord::Migration[5.2]
  class Issue < ActiveRecord::Base
  end

  class User < ActiveRecord::Base
  end

  def change
    Issue.where(user_id: nil).find_each do |i|
      i.update(user_id: User.first.id)
    end
  end
end
