class Svc::V2::Projects::MembersController < Svc::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project

  def index
    @q = @members.ransack(params[:q])
    @q.sorts = "user_email" if @q.sorts.empty?
    @members = @q.result
  end

  def show
  end

  def create
    @member.submit_and_save
    respond_with @member
  end

  def update
    @member.update(member_params)
    respond_with @member
  end

  def destroy
    @member.destroy
    respond_with @member
  end

  def archive
    @member.archive
    respond_with @member
  end

protected
  def member_params
    params.permit(:role, :user_email, :nickname, :receive_mail)
  end

  def flash_interpolation_options
    { reason: @member.errors.full_messages.first }
  end
end
