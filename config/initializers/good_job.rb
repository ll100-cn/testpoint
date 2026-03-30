ActiveSupport.on_load(:good_job_application_controller) do
  before_action :authenticate_good_job_user!

private

  def authenticate_good_job_user!
    return if current_user&.superadmin?

    if current_user
      render plain: "AccessDenied", status: :forbidden
    else
      redirect_to main_app.root_path
    end
  end
end
