# == Schema Information
#
# Table name: storyboards
#
#  id          :bigint           not null, primary key
#  project_id  :bigint           not null
#  title       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  main_axle   :string
#  positions   :json
#
FactoryBot.define do
  factory :storyboard do
    title { "My Storyboard Title" }
    main_axle { "LR" }
    description { "My Storyboard Description" }
  end
end
