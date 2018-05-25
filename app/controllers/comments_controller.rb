class CommentsController < ApplicationController
  load_and_authorize_resource
  before_action :set_issue, only: [:new, :create]

  def new
    @comment = Comment.new
  end

  def create
    @comment.user = current_user
    @comment.save
  end

  def destroy
    @comment.destroy
  end

protected

  def comment_params
    params.fetch(:comment, {}).permit(:content)
  end

  def set_issue
    @comment.issue = @issue
  end
end
