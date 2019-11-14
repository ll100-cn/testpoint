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

FactoryBot.define do
  factory :issue_activity do
    issue
    member
    property { "state" }
    before_value { "pending" }
    after_value { "processing" }
  end
end
