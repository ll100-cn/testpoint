class CommentsAddStyle < ActiveRecord::Migration[7.0]
  class Comment < ActiveRecord::Base; end

  def change
    change_table :comments do |t|
      t.string :display, default: 'normal'
    end

    Comment.reset_column_information
    Comment.where(collapsed: true).update_all(display: 'collapsed')
  end
end
