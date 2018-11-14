Rails.application.config.action_mailer.delivery_method = :smtp
Rails.application.config.action_mailer.smtp_settings = {
  address:              'smtp.exmail.qq.com',
  domain:               'll100.com',
  user_name:            ENV["SMTP_USERNAME"],
  password:             ENV["SMTP_PASSWORD"],
  authentication:       :login,
  port:                 587,
  enable_starttls_auto: true,
}
