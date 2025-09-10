# SNIP: 1f455abe7c65f51a2ac782c31746133c
module JsonSchemaHelper
  def render_schema(url, options = {})
    views_root = Rails.root.join("app/views")
    path = $SCHEMA_READER.resolve_local_path(url).relative_path_from(views_root)
    view_path = path.to_s.sub(".schema.json5", "")

    is_collection = options.key?(:collection) && options.key?(:as)
    if is_collection
      result = render partial: view_path, **options
    else
      result = render view_path, **options
    end

    if !Rails.env.production?
      schemer = $SCHEMA_READER.read(url)

      list = is_collection ? result : [result]
      list.each do |item|
        errors = schemer.validate(JSON.parse(item.to_json)).map { |it| it['error'] }
        raise "JSON schema validation failed: #{errors.join(", ")}" if errors.any?
      end
    end

    result
  end
end
