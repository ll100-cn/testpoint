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

require 'rails_helper'

RSpec.describe TaskAttachment, type: :model do
end
