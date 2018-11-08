class AddNicknameToMember < ActiveRecord::Migration[5.2]
  def change
    change_table :members do |t|
      t.string :nickname
    end
  end
end
