class Api::AttachmentsController < Api::BaseController
  load_resource

  def create
    @attachment.save
    # sleep(5)
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

  def show
  end

  def update
    @attachment.update(attachment_params)
    respond_with @attachment
  end

  def destroy
    @attachment.destroy
  end

protected
  def attachment_params
    params.permit(:file, :title)
  end
end
