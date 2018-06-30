class AttachmentsController < ApplicationController
  load_and_authorize_resource

  def new
  end

  def create
    @attachment.save
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

  def edit
  end

  def update
    @attachment.update(attachment_params)
    redirect_back(fallback_location: root_path)
  end

protected
  def attachment_params
    params.fetch(:attachment, {}).permit(:file, :title)
  end
end
