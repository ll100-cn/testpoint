class AttachmentsController < ApplicationController
  load_resource

  def new
  end

  def create
    @attachment.save
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

  def edit
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
    params.fetch(:attachment, {}).permit(:file, :title)
  end
end
