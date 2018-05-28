class CommentsController < ApplicationController
  load_and_authorize_resource
  before_action :set_issue, only: [:create]
  layout false
  respond_to :html

  def create
    @comment.user = current_user
    @comment.save
    respond_with @comment
  end

protected

  def comment_params
    params.fetch(:comment, {}).permit(:content)
  end

  def set_issue
    @issue = Issue.find(params[:issue_id])
    @comment.issue = @issue
  end
end
