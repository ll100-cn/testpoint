class AddTrelloColumns < ActiveRecord::Migration[7.0]
  def change
    change_table :projects do |t|
      t.string :trello_list_id
      t.string :trello_api_key
      t.string :trello_api_token
    end

    change_table :issues do |t|
      t.string :trello_card_id
    end
  end
end
