class ChangeUserRefToMemberRefInComments < ActiveRecord::Migration[6.0]
  class Comment < ActiveRecord::Base; end
  class User < ActiveRecord::Base; end
  class Member < ActiveRecord::Base; end

  def change
    add_reference :comments, :member, index: true, foreign_key: true
    Comment.all.each do |comment|
      comment.update(member_id: Member.where(user_id: comment.user_id).take.id)
    end
    remove_reference :comments, :user, index: true, foreign_key: true
  end
end
