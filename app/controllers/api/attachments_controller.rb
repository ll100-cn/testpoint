class Api::AttachmentsController < Api::BaseController
  load_and_authorize_resource

  def create
    @attachment.save
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

  def update
    authorize! :update, @attachment.attachmentable

    @attachment.update(attachment_params)
    respond_with @attachment
  end

  def destroy
    authorize! :update, @attachment.attachmentable

    @attachment.destroy
  end

protected
  def attachment_params
    params.permit(:file, :title)
  end
end
