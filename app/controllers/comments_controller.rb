class CommentsController < ApplicationController
  load_and_authorize_resource
  load_and_authorize_resource :issue

  def new
  end

  def create
    @comment.issue = @issue
    @comment.user = current_user
    @comment.save
    redirect_to issue_path(@issue)
  end

protected

  def comment_params
    params.fetch(:comment, {}).permit(:content)
  end
end
