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
  enumerize :category, in: [:duplicated]

  belongs_to :source, class_name: Issue.to_s
  belongs_to :target, class_name: Issue.to_s
  belongs_to :member

  attr_accessor :mark_source_category_as_duplicated
  attr_accessor :creator_subscribe_target_issue

  def submit(current_member)
    self.member = current_member
    transaction do
      success = true
      success &&= self.save
      success &&= duplicated_submit
      raise ActiveRecord::Rollback unless success
    end
    true
  end

  def duplicated_submit
    if self.creator_subscribe_target_issue == "1"
      success = self.source.creator.subscribe(target)
      if !success
        self.errors.add(:source_id, "问题创建人订阅失败")
        return false
      end
    end

    if self.mark_source_category_as_duplicated == "1"
      category = self.source.project.categories.where(name: "重复问题").first_or_create
      success = self.source.update(category: category)
      if !success 
        self.errors.add(:source_id, self.source.errors.full_messages.first)
        return false
      end
    end

    true
  end
end
