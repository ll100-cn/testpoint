# == Schema Information
#
# Table name: test_case_snapshots
#
#  id          :bigint           not null, primary key
#  project_id  :bigint
#  title       :string
#  version_at  :datetime
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :test_case_snapshot do
    sequence(:title) { |n| "title #{n}" }
  end
end
