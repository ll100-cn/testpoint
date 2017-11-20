# == Schema Information
#
# Table name: task_attachments
#
#  id            :integer          not null, primary key
#  task_id       :integer
#  attachment_id :integer
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryGirl.define do
  factory :task_attachment do
    attachment
  end
end
