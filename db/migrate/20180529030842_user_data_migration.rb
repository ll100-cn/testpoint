class UserDataMigration < ActiveRecord::Migration[5.2]
  def change
    User.find_each do |u|
      u.update(username: u.email.split('@').first) if u.username.blank?
    end
  end
end
