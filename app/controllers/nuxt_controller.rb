class NuxtController < ApplicationController
  layout 'nuxt'

  helper_method :nuxt_base_path, :nuxt_dev_origin

  def proxy
    if Rails.env.development?
      render :root
    else
      send_file Rails.public_path.join('200.html'), disposition: 'inline'
    end
  end

private
  def nuxt_base_path
    value = ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    value = "/#{value}" unless value.start_with?('/')
    value = "#{value}/" unless value.end_with?('/')
    value
  end

  def nuxt_dev_origin
    port = ENV.fetch('NUXT_PORT') { ENV.fetch('PORT', 3000).to_i + 100 }
    "#{request.protocol}#{request.host}:#{port}"
  end
end
