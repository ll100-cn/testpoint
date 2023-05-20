# == Schema Information
#
# Table name: versionables
#
#  id                   :bigint           not null, primary key
#  test_case_version_id :bigint           not null
#  test_case_id         :bigint           not null
#  history_id           :integer
#  category             :string
#  case_updated_at      :datetime
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
FactoryBot.define do
  factory :versionable do
  end
end
