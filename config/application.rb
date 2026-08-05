require_relative "boot"

require "rails/all"
require "good_job/engine"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Testpoint
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks templates])

    # Preserve the legacy route lookup and Active Storage route ordering.
    config.paths.add "config/routes.rb", with: ["config/routes.rb", "config/routes"], glob: "**/*.rb"
    config.railties_order = [ActiveStorage::Engine, :main_app, :all]

    config.generators do |g|
      g.assets false
      g.helper false
      g.test_framework :rspec, view_specs: false
    end
    config.app_generators.scaffold_controller :responders_controller

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = "Beijing"
    config.active_record.use_yaml_unsafe_load = true
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end
