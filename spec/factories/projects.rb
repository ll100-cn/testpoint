# == Schema Information
#
# Table name: projects
#
#  id               :bigint           not null, primary key
#  name             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  archived         :boolean          default(FALSE)
#  trello_list_id   :string
#  trello_api_key   :string
#  trello_api_token :string
#

FactoryBot.define do
  factory :project do
    name { "My project" }
  end
end
