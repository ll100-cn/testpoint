class AddUsernameToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :username, :string

    User.find_each do |u|
      u.update(username: u.email.split('@').first)
    end
  end
end
