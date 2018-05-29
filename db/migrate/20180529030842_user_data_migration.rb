class UserDataMigration < ActiveRecord::Migration[5.2]
  class User < ActiveRecord::Base
  end

  def change
    User.where(username: nil).find_each do |u|
      u.update(username: u.email.split('@').first)
    end
  end
end
