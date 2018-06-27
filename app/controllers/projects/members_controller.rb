class Projects::MembersController < BaseProjectController
  before_action { @navbar = "Members" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project
  def index
    @q = @project.members.ransack(params[:q])
    @members = @q.result.page(params[:page])
  end

  def new
  end

  def create
    @member.save
    respond_with @member, location: -> { ok_url_or_default([@project, Member]) }
  end

  def edit
  end

  def update
    @member.update(member_params)
    respond_with @member, location: ok_url_or_default([@project, Member])
  end

  def destroy
    @member.delete
    respond_with @member, location: ok_url_or_default([@project, Member])
  end

protected
  def member_params
    params.fetch(:member, {}).permit(:role, :user_id)
  end
end
