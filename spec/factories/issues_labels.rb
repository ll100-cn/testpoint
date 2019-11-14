# == Schema Information
#
# Table name: issues_labels
#
#  id         :bigint           not null, primary key
#  issue_id   :bigint
#  label_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :issues_label do
  end
end
