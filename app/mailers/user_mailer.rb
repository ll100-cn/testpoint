class UserMailer < Devise::Mailer

  def activation_instructions(record, token, opts = {})
    @token = token
    devise_mail(record, :activation_instructions, opts)
  end
end
