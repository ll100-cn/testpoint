class Api::Projects::CommentsController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def index
  end

  def create
    @comment.member = current_member
    if @comment.save
      @issue.notify_commented_by(current_member)
    end
    respond_with @comment
  end

  def update
    @comment.update_with_author(comment_params, current_member)
    respond_with @comment
  end

  def destroy
    @comment.destroy
    respond_with @comment
  end

  def unfold
    @comment.unfold
    respond_with @comment
  end

  def fold
    @comment.fold
    respond_with @comment
  end

protected
  def comment_params
    params.permit(:content, :comment_id, attachment_ids: [])
  end
end
