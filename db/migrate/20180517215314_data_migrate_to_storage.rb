require 'compute_checksum'
class DataMigrateToStorage < ActiveRecord::Migration[5.2]
  def change
    Attachment.all.each do |a|
      unless ActiveStorage::Attachment.all.map(&:record_id).include?(a.id)
        files = Dir[Rails.root.join('public', 'uploads', 'attachment','file', a.id.to_s, '*')]
        if files.size == 1
          if files.first.split('.').last == "jpg"
            content_type = "image/jpeg"
          else
            content_type = "image/#{files.first.split('.').last}"
          end
          byte_size = File.open(files.first).size
          checksum = compute_checksum(File.open(files.first))
          key = ActiveStorage::Blob.generate_unique_secure_token
          blobs = ActiveStorage::Blob.count
          ActiveStorage::Blob.create(
              key: key,
              filename: a.file.instance_values["record"]["file"],
              content_type: content_type,
              metadata: {"identified"=>true, "analyzed"=>true},
              byte_size: byte_size,
              checksum: checksum,
              created_at: a.created_at
          )
          if ActiveStorage::Blob.count == blobs + 1
            ActiveStorage::Attachment.create(
                name: a.file.name,
                record_type: "Attachment",
                record_id: a.id,
                blob_id: ActiveStorage::Blob.last.id,
                created_at: a.created_at
            )
          end
        end
      end
    end
  end
end
