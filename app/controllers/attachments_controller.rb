class AttachmentsController < BaseProjectController
  load_and_authorize_resource

  def create
    @attachment.save
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

protected

  def attachment_params
    params.fetch(:attachment, {}).permit(:file, :title)
  end
end
