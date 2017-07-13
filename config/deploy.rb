set :application, "testpoint"
set :deploy_to, "/home/app/www"

fetch(:linked_files).concat %w[
  config/env
  tmp/restart.txt
]

fetch(:linked_dirs).concat %w[
  node_modules
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
