class CommentsController < ApplicationController
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def new
  end

  def create
    @comment.user = current_user
    @comment.save
    redirect_to issue_path(@issue)
  end

protected

  def comment_params
    params.fetch(:comment, {}).permit(:content)
  end
end
