source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "7.0.6"
gem 'rails-i18n', '7.0.7'

gem "sprockets-rails", "3.4.2"

# Use postgresql as the database for Active Record
gem "pg", "1.5.3"
gem "dalli", "2.7.11"
# Use Puma as the app server
gem "puma", "6.3.0"

# Use Redis adapter to run Action Cable in production
# gem 'redis', '4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '3.1.7'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '1.16.0', require: false

# Libaray
gem "dotenv-rails", "2.8.1"
gem "sentry-raven", "3.1.2"
gem "hashie", "5.0.0"
gem "ffi", "1.15.5"

# Controllers
gem "responders", "3.1.0"

# Models
gem "devise", "4.9.2"
gem "devise-i18n", "1.11.0"
gem "devise_code_authenticatable", '0.2.3'
gem "cancancan", "3.5.0"
gem 'fume-cancan', '0.1.0'
gem "enumerize", "2.7.0"
gem 'ancestry', '3.2.1'
gem "ransack", "4.0.0", require: false
gem 'paper_trail-association_tracking', '2.2.1'
gem 'paper_trail', '14.0.0'
gem "active_attr", "0.15.4"
gem "fume-aloader", "0.1.6"

# Views
gem 'simple_form', '5.0.1'
gem 'kaminari', '1.2.2'
gem 'fume-nav', '0.1.4'
gem 'jbuilder', '2.11.5'
gem 'kramdown', '2.3.0'
gem 'rgb', '0.1.0'
gem "jb", "0.8.0"
gem 'has_array_of', github: "marshall-lee/has_array_of"
gem "fume", "0.10.0", require: false
gem "uri_template", "0.7.0"

# Assets
gem 'vite_rails', '3.0.19'
gem 'vite_ruby', '3.9.1'

# Use Active Storage variant
gem 'image_processing', '1.12.1'

# backgound
gem 'sidekiq', '7.2.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '11.1.3', platforms: [:mri, :mingw, :x64_mingw]

  gem 'pry-rails', '0.3.9'
  gem 'annotate', '3.2.0'
  gem "factory_bot_rails", "6.2.0"
  gem "rspec-rails", "6.0.3"

  gem "rubocop", ">= 1.23.0", require: false
  gem "rubocop-rails", ">= 2.12.0", require: false
  gem 'rubocop-performance', "1.18.0", require: false
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '4.2.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  # gem 'rack-mini-profiler', '2.3.0'
  gem 'listen', '3.4.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring', '2.1.0'
  # gem 'spring-watcher-listen', '2.0.1'

  gem 'capsum', '1.1.7', require: false
  gem 'ed25519'
  gem 'bcrypt_pbkdf'
end

group :test do
  gem 'faker', '2.15.1'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '3.39.2'
  gem 'selenium-webdriver', '3.142.7'

  gem 'rails-controller-testing', '1.0.5'
  gem 'rspec-do_action', '0.0.7'
  gem 'shoulda-matchers', '4.4.1'
  # gem 'simplecov', '0.16.1', require: false
  # gem 'coveralls', '0.8.23', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
