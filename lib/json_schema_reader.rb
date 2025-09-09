# SNIP: 1f455abe7c65f51a2ac782c31746133c
require "json_schemer"

class JsonSchemaReader
  def initialize(mappings)
    @mappings = mappings
    @cache = {}
    @file_mtimes = {}
  end

  def read(location)
    url = location.to_s
    root = read_hash(url)
    JSONSchemer.schema(root, ref_resolver: method(:ref_resolver))
  end

  def read_hash(url)
    local_path = resolve_local_path(url)
    raise "ref resolver: unknown url: #{url}" if local_path.nil?

    local_path = local_path.dirname.join("_#{local_path.basename}")
    raise "ref resolver: file not found: #{local_path}" if !local_path.exist?

    if should_reload_cache?(url, local_path)
      json = RbJSON5.parse(local_path.read)
      @cache[url] = json
      @file_mtimes[url] = local_path.mtime
    end

    @cache[url]
  end

  def ref_resolver(location)
    url = location.to_s
    read_hash(url)
  end

  def resolve_local_path(url)
    @mappings.each do |base_uri, base_dir|
      next unless url.start_with?(base_uri)
      relative = url.sub(base_uri, '')
      # strip fragment part like #/definitions/x
      relative = relative.split('#', 2).first
      # allow omitting suffix: schema://backend/foo -> foo
      relative += ".schema.json5" unless relative.end_with?(".schema.json5")
      return base_dir.join(relative)
    end

    nil
  end

  def should_reload_cache?(url, file_path)
    return true if !@cache.key?(url)
    return true if !@file_mtimes.key?(url)

    file_path.mtime > @file_mtimes[url]
  end
end
