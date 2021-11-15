# == Schema Information
#
# Table name: issue_relationships
#
#  id         :bigint           not null, primary key
#  target_id  :bigint
#  source_id  :bigint
#  member_id  :bigint
#  category   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class IssueRelationship < ApplicationRecord
  belongs_to :source, class_name: Issue.to_s
  belongs_to :target, class_name: Issue.to_s
  belongs_to :member

  attr_accessor :creator_subscribe_target_issue

  def submit_and_save(current_member)
    self.member = current_member
    transaction do
      success = true
      success &&= self.save
      success &&= submit
      raise ActiveRecord::Rollback unless success
    end
    true
  end

  def submit
    if self.creator_subscribe_target_issue == "1"
      success = self.source.creator.subscribe(target)
      if !success
        self.errors.add(:source_id, "问题创建人订阅失败")
        return false
      end
    end

    true
  end
end
