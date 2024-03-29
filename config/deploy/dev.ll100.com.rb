# server 'app@dev.ll100.com:5011', roles: %w[web app db], primary: true , sidekiq: true, whenever: true
set :default_env, { RAILS_RELATIVE_URL_ROOT: "/testpoint/", VITE_RUBY_BASE: "/testpoint/" }
server 'app@dev.ll100.com:5011', roles: %w[web app db], primary: true

fetch(:remote_env)["NODE_OPTIONS"] = "--max-old-space-size=1024"