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
    true
  end

  def duplicated_submit
    return true unless self.category.duplicated?
    return true unless ["pending", "confirmed", "processing"].include?(self.source.state)

    unless self.source.update_with_editor({"state" => "closed"}, self.member)
      self.errors.add(:source_id, self.source.errors.full_messages.first)
      return false
    end
    true
  end
end
