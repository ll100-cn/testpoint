# == Schema Information
#
# Table name: attachments
#
#  id         :integer          not null, primary key
#  file       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :attachment do
    file { ResourceHelper.upload_file("avatar.png") }
    title "this is a title"
  end
end
