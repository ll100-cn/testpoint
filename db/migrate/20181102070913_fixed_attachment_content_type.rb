class FixedAttachmentContentType < ActiveRecord::Migration[5.2]
  class Attachment < ActiveRecord::Base; end

  def change
    remove_column :attachments, :file, :string

    Attachment.where(content_type: nil).find_each do |attachment|
      storage_attachment = ActiveStorage::Attachment.where(record_id: attachment.id, record_type: "Attachment").take!
      storage_blob = ActiveStorage::Blob.where(id: storage_attachment.blob_id).take!
      attachment.title = storage_blob.filename
      attachment.content_type = storage_blob.content_type
      attachment.save!
    end
  end
end
