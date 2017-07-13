set :application, "testpoint"
set :deploy_to, "/home/app/www"

fetch(:linked_files).concat %w[
  config/env
  tmp/restart.txt
]

fetch(:linked_dirs).concat %w[
  public/packs
  public/uploads
]

set :bundle_flags, ""

module YarnBeforePrecompile
  def execute(*args)
    options = args.extract_options!
    name = args.shift
    if name.to_s == "rake" && args.first == "assets:precompile"
      super("bin/yarn", "install")
    end

    super(name, *args, options)
  end
end
SSHKit::Backend::Netssh.prepend(YarnBeforePrecompile)

namespace :deploy do
  desc "rake db:seed"
  task :seed do
    on primary(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, "db:seed"
        end
      end
    end
  end
end
after "deploy:migrate", "deploy:seed"
