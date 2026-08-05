source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem "rails", "8.1.3.1"
gem "rails-i18n", "8.1.0"
gem "propshaft"

# Use PostgreSQL as the database for Active Record.
gem "pg", "1.5.3"
gem "dalli", "2.7.11"
gem "puma", "6.3.0"

# Reduces boot times through caching; required in config/boot.rb.
gem "bootsnap", "1.16.0", require: false

# Library
gem "dotenv-rails", "2.8.1"
gem "sentry-raven", "3.1.2"
gem "hashie", "5.0.0"
gem "ffi", "1.15.5"

# Controllers
gem "responders", "3.1.0"
gem "rails-reverse-proxy", "0.13.0"

# Models
gem "devise", "~> 5.0"
gem "devise-i18n", "1.11.0"
gem "devise_code_authenticatable", "0.2.3"
gem "cancancan", "3.5.0"
gem "fume-cancan", "0.1.0"
gem "enumerize", "2.7.0"
gem "ancestry", "3.2.1"
gem "ransack", "4.4.1", require: false
gem "paper_trail-association_tracking"
gem "paper_trail"
gem "active_attr", "0.17.2"
gem "fume-aloader", "0.1.6"

# Views
gem "simple_form", "5.0.1"
gem "kaminari", "1.2.2"
gem "fume-nav", "0.1.4"
gem "jbuilder"
gem "kramdown", "2.3.0"
gem "rgb", "0.1.0"
gem "jb", "0.8.0"
gem "has_array_of", github: "marshall-lee/has_array_of"
gem "fume", "0.10.0", require: false
gem "uri_template", "0.7.0"
gem "json_schemer", "2.4.0"
gem "rb_json5", "0.3.0"

# Active Storage variants
gem "image_processing", "1.12.1"

# Background jobs
gem "good_job", "4.12.1"

group :development, :test do
  gem "byebug", "11.1.3", platforms: [:mri, :mingw, :x64_mingw]
  gem "observer"
  gem "pry-rails", "0.3.9"
  gem "factory_bot_rails", "6.2.0"
  gem "rspec-rails", "~> 8.0"

  gem "rubocop", ">= 1.23.0", require: false
  gem "rubocop-rails", ">= 2.12.0", require: false
  gem "rubocop-performance", "1.18.0", require: false
end

group :development do
  gem "web-console", "4.2.0"
  gem "listen", "3.10.0"
  gem "capsum", "1.1.7", require: false
  gem "ed25519"
  gem "bcrypt_pbkdf"
end

group :test do
  gem "faker", "3.6.1"
  gem "capybara", "3.39.2"
  gem "selenium-webdriver", "3.142.7"
  gem "rails-controller-testing", "1.0.5"
  gem "rspec-do_action", "0.0.7"
  gem "shoulda-matchers", "4.4.1"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
