class AttachmentsController < ApplicationController
  load_and_authorize_resource
  before_action :load_attachmentable, only: :create

  def create
    @attachment.save
    respond_with @attachment
  end

protected

  def load_attachmentable
    resource, id = request.path.split('/')[-3, 2]
    @attachmentable = resource.singularize.classify.constantize.find(id)
    @attachment = @attachmentable.attachments.new
  end

  def attachment_params
    params.fetch(:attachment, {}).permit(:file, :title)
  end
end
