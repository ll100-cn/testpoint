# == Schema Information
#
# Table name: task_attachments
#
#  id            :bigint(8)        not null, primary key
#  task_id       :bigint(8)
#  attachment_id :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :task_attachment do
    attachment
  end
end
