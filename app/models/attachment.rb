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

class Attachment < ApplicationRecord
  belongs_to :attachmentable, polymorphic: true, optional: true

  has_one_attached :file
end
