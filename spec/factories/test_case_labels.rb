# == Schema Information
#
# Table name: test_case_labels
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :text
#  project_id  :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryBot.define do
  factory :test_case_label do
    name { "Test Case Label 1" }
    description { "no descriptions" }
    project
  end
end
