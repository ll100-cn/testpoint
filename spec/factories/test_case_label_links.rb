# == Schema Information
#
# Table name: test_case_label_links
#
#  id                 :bigint           not null, primary key
#  test_case_label_id :bigint           not null
#  test_case_id       :bigint           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

FactoryBot.define do
  factory :test_case_label_link do
  end
end
