class AddReceiveMailToMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :receive_mail, :boolean, default: false
  end
end
