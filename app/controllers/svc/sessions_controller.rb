class Svc::SessionsController < Devise::SessionsController
  respond_to :json

  prepend_before_action :allow_params_authentication!, only: :create
  skip_before_action :verify_authenticity_token

  def deliver
    self.resource = User.send_code_login_instructions(params)
    if successfully_sent?(resource)
      @login_code = resource.login_codes.last
    else
      self.resource.errors.add(:base, "无法发送邮件")
    end

    respond_with self.resource
  end

  def create
    self.resource = warden.authenticate!(auth_options)

    sign_in(resource_name, resource)
    render json: {}
  end

  def destroy
    sign_out(current_user)
    render json: { success: true }
  end

protected
  def auth_options
    :code_authenticatable
  end

  def sign_in_params
    devise_parameter_sanitizer.sanitize(:sign_in)
  end

  def serialize_options(resource)
    methods = resource_class.authentication_keys.dup
    methods = methods.keys if methods.is_a?(Hash)
    methods << :login_code if resource.respond_to?(:login_code)
    { methods: methods, only: [:login_code] }
  end
end