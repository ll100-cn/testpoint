# == Schema Information
#
# Table name: issue_activities
#
#  id           :bigint           not null, primary key
#  issue_id     :integer
#  member_id    :integer
#  property     :string
#  before_value :string
#  after_value  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class IssueActivity < ApplicationRecord
  belongs_to :issue
  belongs_to :member

  [
    [ 'category', 'category_id', "Category" ],
    [ 'creator', 'creator_id', "Member" ],
    [ 'assignee', 'assignee_id', "Member" ],
    [ 'milestone', 'milestone_id', "Milestone" ],
    [ 'project', 'project_id', "Project" ],
  ].each do |code, property, class_name|
    belongs_to :"before_#{code}", ->(record) { none if record.property != property }, foreign_key: :before_value, class_name: class_name, optional: true
    belongs_to :"after_#{code}", ->(record) { none if record.property != property }, foreign_key: :after_value, class_name: class_name, optional: true
  end

  cleanup_column :before_value, :after_value
end
