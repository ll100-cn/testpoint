class Api::Projects::CommentsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, with_scope: ->(base) {
    params[:action] == "index" ? base.in_project(@project) : base.where(project_id: @project.id)
  }
  load_and_authorize_resource through: :issue

  def index
    @comments = @comments.joins(:member).where(members: { project_id: current_member.project_id })
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

protected
  def comment_params
    params.permit(:content, :comment_id, :collapsed, attachments_params: [ :id, :title ])
  end
end
