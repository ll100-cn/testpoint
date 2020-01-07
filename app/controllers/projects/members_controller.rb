class Projects::MembersController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @q = @project.members.ransack(params[:q])
    @members = @q.result.page(params[:page])
  end

  def new
  end

  def create
    if @member.submit
      @user = @member.user
      @user.send_activation_instructions unless @user.confirmed?
    end

    respond_with @member, location: -> { ok_url_or_default([@project, Member]) }
  end

  def edit
  end

  def update
    @member.update(member_params)
    respond_with @member, location: ok_url_or_default([@project, Member])
  end

  def destroy
    @member.destroy
    respond_with @member, location: ok_url_or_default([@project, Member])
  end

protected
  def member_params
    params.fetch(:member, {}).permit(:role, :email, :name, :nickname)
  end

  def flash_interpolation_options
    { reason: @member.errors.full_messages.first }
  end
end
