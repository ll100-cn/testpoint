# server 'app@dev.ll100.com:5011', roles: %w[web app db], primary: true , sidekiq: true, whenever: true
set :default_env, { RAILS_RELATIVE_URL_ROOT: "/testpoint" }
server 'app@dev.ll100.com:5011', roles: %w[web app db], primary: true