# == Schema Information
#
# Table name: task_upshots
#
#  id               :bigint           not null, primary key
#  task_id          :bigint           not null
#  phase_id         :bigint           not null
#  state            :string
#  state_changed_at :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  content          :text
#  token            :string
#
FactoryBot.define do
  factory :task_upshot do
    task { nil }
    phase { nil }
    state { "MyString" }
  end
end
