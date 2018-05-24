Raven.configure do |config|
  config.dsn = ENV['SENTRY_DNS']
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.environments = %w[production staging]
  config.current_environment = "staging" if Rails.env.production? && Project.staging_environment?
end
