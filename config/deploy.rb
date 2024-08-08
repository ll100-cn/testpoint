set :application, "testpoint"
set :deploy_to, "/home/app/www"

# rubocop:disable Style/ConcatArrayLiterals
fetch(:linked_files).concat %w[
  config/env
  config/mailer.yml
  config/redis.yml
  config/sidekiq.yml
  config/database.yml
  config/master.key
  tmp/restart.txt
]

fetch(:linked_dirs).concat %w[
  public/uploads
  storage
]

set :bundle_flags, ""

# module YarnBeforePrecompile
#   def execute(*args)
#     options = args.extract_options!
#     name = args.shift
#     if name.to_s == "rake" && args.first == "assets:precompile"
#       super("bin/yarn", "install")
#     end
#
#     super(name, *args, options)
#   end
# end
# SSHKit::Backend::Netssh.prepend(YarnBeforePrecompile)

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

  desc "yarn install"
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute :yarn, 'install'
      end
    end
  end
end
after "deploy:migrate", "deploy:seed"

fetch(:rsync_options).concat %w[--exclude=/node_modules --exclude=/tmp/cache -v]
namespace :local do
  task :compile_assets do
    base_dir = fetch(:rsync_stage)
    folder = fetch(:rsync_folder, "/")
    deploy_dir = File.join(base_dir, folder)

    Dir.chdir deploy_dir do
      on primary(:web) do
        [
          # "config/env",
          "config/master.key"
        ].each do |path|
          download! File.join(shared_path, path), path
        end
      end

      run_locally do
        execute "cp -f config/database.yml.example config/database.yml"
        execute "cp -f config/redis.yml.example config/redis.yml"
        Bundler.with_original_env do
          execute "bundle", "update"
          execute "yarn", "install"

          execute "rm", "-rf", "public/assets"
          execute "bin/vite", "clobber", "-m", "production"
          execute "bundle", "exec", "rake", "assets:precompile", "RAILS_ENV=production"
        end
      end
    end
  end
end

after "rsync:stage", "local:compile_assets"
task("deploy:compile_assets").clear
task("deploy:set_linked_dirs").clear