source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '6.1.1'
gem 'rails-i18n', '6.0.0'

# Use postgresql as the database for Active Record
gem 'pg', '1.1.4'
# Use Puma as the app server
gem 'puma', '5.1.1'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '3.1.7'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '1.4.5', require: false

# Libaray
gem 'dotenv-rails', '2.7.6'
gem 'rubocop', '1.6.1', require: false
gem 'sentry-raven', '3.1.1'
gem 'hashie', '4.1.0'

# Controllers
gem 'responders', '3.0.1'

# Models
gem 'devise', '4.7.3'
gem 'devise-i18n', '1.9.2'
gem 'devise_code_authenticatable', '0.2.2'
gem 'cancancan', '3.2.1'
gem 'enumerize', '2.4.0'
gem 'ancestry', '3.2.1'
gem 'ransack', '2.4.1', require: false
gem 'paper_trail-association_tracking', '2.1.1'
gem 'paper_trail', '11.1.0'
gem 'active_attr', '0.15.1'

# Views
gem 'simple_form', '5.0.1'
gem 'kaminari', '1.2.1'
gem 'fume-nav', '0.1.4'
gem 'jbuilder', '2.9.1'
gem 'kramdown', '2.3.0'
gem 'rgb', '0.1.0'

# Assets
gem 'sass-rails', '5.1.0'
gem 'uglifier', '4.2.0'
gem 'webpacker', '5.2.1'
gem 'coffee-rails', '5.0.0'
# gem 'turbolinks', '5.2.1'

# Use Active Storage variant
gem 'image_processing', '1.12.1'

# backgound
gem 'sidekiq', '6.0.2'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '11.0.1', platforms: [:mri, :mingw, :x64_mingw]

  gem 'pry-rails', '0.3.9'
  gem 'annotate', '3.1.1'
  gem 'factory_bot_rails', '6.1.0'
  gem 'rspec-rails', '4.0.1'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '2.3.0'
  gem 'listen', '3.4.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring', '2.1.0'
  # gem 'spring-watcher-listen', '2.0.1'

  gem 'capsum', '1.1.4', require: false
  gem 'ed25519'
  gem 'bcrypt_pbkdf'
end

group :test do
  gem 'faker', '2.15.1'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '3.34.0'
  gem 'selenium-webdriver', '3.142.7'

  gem 'rails-controller-testing', '1.0.4'
  gem 'rspec-do_action', '0.0.7'
  gem 'shoulda-matchers', '4.4.1'
  gem 'simplecov', '0.16.1', require: false
  gem 'coveralls', '0.8.23', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "shakapacker", "= 7.0"
