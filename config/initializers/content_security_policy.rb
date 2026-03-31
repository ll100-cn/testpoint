require 'base64'
require 'digest'

nuxt_inline_script_hashes = lambda do
  file = Rails.public_path.join('200.html')
  next [] unless file.exist?

  file.read.scan(/<script\b(?![^>]*\bsrc=)[^>]*>(.*?)<\/script>/m).flatten.filter_map do |content|
    script = content.strip
    next if script.empty?

    Base64.strict_encode64(Digest::SHA256.digest(script))
  end.uniq
end

Rails.application.config.content_security_policy do |policy|
  policy.default_src :self, :https
  policy.font_src :self, :https, :data
  policy.img_src :self, :https, :data, :blob
  policy.object_src :none
  policy.script_src :self, :https
  policy.style_src :self, :https, :unsafe_inline
  policy.connect_src :self, :https

  if Rails.env.development?
    # Nuxt/Vite dev HTML includes inline bootstrap scripts when proxied through Rails.
    policy.script_src *policy.script_src, :unsafe_eval, :unsafe_inline, 'http:'
    policy.connect_src *policy.connect_src, 'http:', 'ws:'
  else
    hashes = nuxt_inline_script_hashes.call
    policy.script_src *policy.script_src, *hashes.map { |hash| "'sha256-#{hash}'" }
  end
end
