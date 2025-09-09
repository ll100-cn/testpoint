# SNIP: 1f455abe7c65f51a2ac782c31746133c
require "json_schema_reader"

schema_map = RbJSON5.parse(Rails.root.join("schema_mapping.json5").read)
$SCHEMA_READER = JsonSchemaReader.new(schema_map.transform_values { |it| Rails.root.join(it) })
