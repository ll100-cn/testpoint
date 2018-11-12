# == Schema Information
#
# Table name: issue_activities
#
#  id           :bigint(8)        not null, primary key
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

  cleanup_column :before_value, :after_value
end
