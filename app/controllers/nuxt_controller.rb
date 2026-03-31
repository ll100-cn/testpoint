class NuxtController < ApplicationController
  include ReverseProxy::Controller
  skip_forgery_protection

  def proxy
    if Rails.env.production?
      send_file Rails.public_path.join("200.html"), disposition: "inline"
    else
      origin = "http://#{request.host}:#{request.port + 100}"
      reverse_proxy origin, path: request.fullpath
    end
  end
end