# == Schema Information
#
# Table name: attachments
#
#  id                  :bigint(8)        not null, primary key
#  file                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  title               :text
#  attachmentable_id   :bigint(8)
#  attachmentable_type :string
#

FactoryBot.define do
  factory :attachment do
    title "this is a title"
    after(:build) do |attachment|
      attachment.file.attach(io: File.open(Rails.root.join("spec", "resources", "avatar.png")), filename: 'avatar.png', content_type: "image/png")
    end
  end
end
