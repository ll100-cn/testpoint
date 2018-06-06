class RemoveUserIdIssue < ActiveRecord::Migration[5.2]
  class Issue < ActiveRecord::Base
  end

  def change
    Issue.where.not(user_id: nil).find_each do |i|
      i.update(creator_id: i.user_id)
    end
    remove_reference :issues, :user, index: true
  end
end
