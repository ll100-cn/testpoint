class CommentsController < ApplicationController
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def new
  end

  def create
    @comment.user = current_user
    @comment.save
    respond_with @comment, location: ok_url_or_default([@project, @issue])
  end

protected

  def comment_params
    params.fetch(:comment, {}).permit(:content, attachments_attributes: [:id, :title, :file, :_destroy])
  end
end
