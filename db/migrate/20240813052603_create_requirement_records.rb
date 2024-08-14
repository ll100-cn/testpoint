class CreateRequirementRecords < ActiveRecord::Migration[7.0]
  class RequirementRecord < ActiveRecord::Base; end
  class Requirement < ActiveRecord::Base; end

  def change
    create_table :requirement_records do |t|
      t.belongs_to :requirement, foreign_key: true, null: false
      t.bigint :roadmap_ids, array: true, default: []
      t.datetime :deleted_at, index: true

      t.bigint :platform_ids, array: true, default: []
      t.bigint :upstream_ids, array: true, default: []

      t.string :title
      t.text :description

      t.bigint :label_ids, array: true, default: []
      t.json :label_descriptions

      t.timestamps
    end

    Requirement.find_each do |requirement|
      RequirementRecord.create!(
        requirement_id: requirement.id,
        platform_ids: requirement.platform_ids,
        upstream_ids: requirement.upstream_ids,
        title: requirement.title,
        description: requirement.description,
        label_ids: requirement.label_ids,
        label_descriptions: requirement.label_descriptions,
        created_at: requirement.created_at,
        updated_at: requirement.updated_at,
      )
    end
  end
end