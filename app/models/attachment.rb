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

  validates :title, presence: true, length: { maximum: 20 }, on: :update

  before_create :assign_title, :assign_content_type

  def assign_title
    self.title = self.file.blob.filename
  end

  def assign_content_type
    self.content_type = self.file.blob.content_type
  end

  def image?
    self.content_type.start_with?("image/")
  end
end
