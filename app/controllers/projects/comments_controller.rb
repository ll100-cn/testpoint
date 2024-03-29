class Projects::CommentsController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue
  load_and_authorize_resource through: :issue

  def new
  end

  def create
    @comment.member = current_member
    if @comment.save
      @issue.notify_commented_by(current_member)
    end
    respond_with @comment, location: ok_url_or_default([@project, @issue, @comment])
  end

  def edit
  end

  def update
    @comment.update_with_author(comment_params, current_member)
    respond_with @comment, location: ok_url_or_default([@project, @issue])
  end

  def destroy
    @comment.destroy
    respond_with @comment, location: ok_url_or_default([@project, @issue])
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
    params.fetch(:comment, {}).permit(:content, :comment_id, attachment_ids: [])
  end
end
