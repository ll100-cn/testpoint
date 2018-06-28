# == Schema Information
#
# Table name: issue_attachments
#
#  id            :bigint(8)        not null, primary key
#  issue_id      :bigint(8)
#  attachment_id :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :issue_attachment do
    attachment
  end
end
