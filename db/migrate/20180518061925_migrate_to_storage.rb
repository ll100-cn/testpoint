class MigrateToStorage < ActiveRecord::Migration[5.2]
  class Attachment < ActiveRecord::Base
  end

  class ActiveStorageAttachment < ActiveRecord::Base
  end

  def change
    Attachment.find_each do |attachment|
      data_migration(attachment)
    end
  end

  def data_migration(attachment)
    return if ActiveStorage::Attachment.where(record_id: attachment.id, record_type: "Attachment").exists?
    path = Rails.root.join('public/uploads/attachment/file', attachment.id.to_s, attachment.file)
    content_type = Mime::Type.lookup_by_extension(path.extname.delete('.')).to_s
    file = Rack::Test::UploadedFile.new(path, content_type)
    blob = ActiveStorage::Blob.create_after_upload!(io: file, filename: file.original_filename, content_type: file.content_type)
    ActiveStorageAttachment.create(record_id: attachment.id, record_type: "Attachment", name: "file", blob_id: blob.id)
  end
end
