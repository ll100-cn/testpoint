class ResetPasswordsController < Devise::PasswordsController

  def update
    super do |resource|
      resource.confirm if resource.errors.empty? && !resource.confirmed?
    end
  end
end
