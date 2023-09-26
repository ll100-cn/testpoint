class Api::Projects::MembersController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project, authorization_action: ->(action) { { list: :index }[action] }

  def index
    @q = @project.members.ransack(params[:q])
    @q.sorts = "user_email" if @q.sorts.empty?
    @members = @q.result.page(params[:page])

    kaminari_headers(@members)
  end

  def list
    @members = @project.members.available.ranked
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
