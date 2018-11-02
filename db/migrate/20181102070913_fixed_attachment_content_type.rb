class FixedAttachmentContentType < ActiveRecord::Migration[5.2]
  class Attachment < ActiveRecord::Base; end

  def change
    Attachment.where(content_type: nil).find_each do |attachment|
      title = attachment.file.blob.filename
      content_type = attachment.file.blob.content_type
      attachment.update(content_type: content_type, title: title)
    end
  end
end
