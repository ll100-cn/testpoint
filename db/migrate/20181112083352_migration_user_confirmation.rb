class MigrationUserConfirmation < ActiveRecord::Migration[5.2]
  class User < ActiveRecord::Base; end

  def change
    User.where(confirmed_at: nil).update_all("confirmed_at=created_at")
  end
end
