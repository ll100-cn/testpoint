module NuxtFallback
  class ProxyController < ApplicationController
    include ReverseProxy::Controller

    skip_forgery_protection

    def show
      if Rails.env.production?
        send_file Rails.public_path.join("200.html"), disposition: "inline"
      else
        origin = "http://#{request.host}:#{ENV.fetch("NUXT_PORT", 3001)}"
        reverse_proxy origin, path: request.fullpath
      end
    end
  end
end
