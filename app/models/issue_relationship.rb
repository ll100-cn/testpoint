# == Schema Information
#
# Table name: issue_relationships
#
#  id         :bigint(8)        not null, primary key
#  target_id  :bigint(8)
#  source_id  :bigint(8)
#  category   :string
#  member_id  :bigint(8)
#  created_at :datetime
#  updated_at :datetime
#

class IssueRelationship < ApplicationRecord
  enumerize :category, in: [:duplicated, :reference]

  belongs_to :source, class_name: Issue.to_s
  belongs_to :target, class_name: Issue.to_s
  belongs_to :member

  def submit(current_member)
    self.member = current_member
    transaction do
      success = true
      success &&= self.save
      success &&= duplicated_submit
      raise ActiveRecord::Rollback unless success
    end
  end

  def duplicated_submit
    return true unless self.category.duplicated?
    return true unless ["pending", "processing"].include?(self.source.state)

    unless self.source.update_with_editor({"state" => "closed"}, self.member)
      self.errors.add(:source_id, self.source.errors.full_messages.first)
      return false
    end
    true
  end
end
