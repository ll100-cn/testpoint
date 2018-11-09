class MigrateMemberRole < ActiveRecord::Migration[5.2]
  class Member < ActiveRecord::Base; end

  def change
    Member.where(role: "admin").update_all(role: "manager")
    Member.where(role: "member").update_all(role: "developer")
  end
end
