require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Testpoint
  class Application < Rails::Application
    # Use the responders controller from the responders gem
    config.app_generators.scaffold_controller :responders_controller

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.paths.add "config/routes.rb", with: [ "config/routes.rb", "config/routes" ], glob: "**/*.rb"
    config.railties_order = [ActiveStorage::Engine, :main_app, :all]


    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.generators do |g|
      g.assets false
      g.helper false
      g.test_framework :rspec, view_specs: false
    end

    config.time_zone = "Beijing"
    config.active_record.use_yaml_unsafe_load = true
  end
end
