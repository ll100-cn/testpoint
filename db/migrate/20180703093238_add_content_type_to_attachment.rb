class AddContentTypeToAttachment < ActiveRecord::Migration[5.2]
  def change
    add_column :attachments, :content_type, :string

    Attachment.where(content_type: nil).find_each do |attachment|
      attachment.update(content_type: attachment.file.blob.content_type)
    end
  end
end
