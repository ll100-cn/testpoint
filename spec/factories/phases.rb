# == Schema Information
#
# Table name: phases
#
#  id               :bigint           not null, primary key
#  plan_id          :bigint           not null
#  title            :string
#  release_revision :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  index            :integer
#
FactoryBot.define do
  factory :phase do
    plan
    sequence(:index) { |n| n }
    sequence(:title) { |n| "第 #{n} 轮" }
    release_revision { "1230" }
  end
end
