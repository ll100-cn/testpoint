class AttachmentsController < ApplicationController
  load_and_authorize_resource

  def create
    @attachment.save
    respond_with @attachment
  end

protected

  def attachment_params
    params.fetch(:attachment, {}).permit(:file)
  end
end
