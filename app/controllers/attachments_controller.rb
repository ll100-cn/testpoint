class AttachmentsController < ApplicationController
  load_and_authorize_resource

  def create
    @attachment.save
    @blob = ActiveStorage::Blob.find(@attachment.file.attachment.blob_id)
    respond_with @attachment
  end

  def edit
  end

  def update
    @attachment.update(attachment_params)
    respond_with @attachment, location: -> { ok_url_or_default([Issue]) }
  end

  def destroy
    @attachment.delete
    respond_with @attachment, location: -> { ok_url_or_default([Issue]) }
  end

protected

  def attachment_params
    params.fetch(:attachment, {}).permit(:file, :title)
  end
end
