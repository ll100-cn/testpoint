# == Schema Information
#
# Table name: requirements
#
#  id            :bigint           not null, primary key
#  project_id    :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  storyboard_id :bigint
#  scene_id      :bigint
#
class Requirement < ApplicationRecord
  belongs_to :project
  belongs_to :storyboard
  belongs_to :scene, optional: true
  has_many :records, class_name: RequirementRecord.to_s, dependent: :destroy

  has_array_of :upstreams, class_name: 'Requirement'
  has_array_of :platforms, class_name: 'Platform'
  has_array_of :labels, class_name: 'TestCaseLabel'

  def create_with_record(params, record_params)
    record = RequirementRecord.new(requirement: self)
    local_records = [ record ]
    assign_attributes(params)
    save_with_record(record, record_params)
  end

  def update_with_record(params, record_params)
    record = local_records.first
    if record.roadmap_ids.any?
      record = records.build(
        platform_ids: record.platform_ids,
        upstream_ids: record.upstream_ids,
        title: record.title,
        description: record.description,
        label_ids: record.label_ids,
        label_descriptions: record.label_descriptions,
      )
      local_records.unshift(record)
    end

    assign_attributes(params)
    save_with_record(record, record_params)
  end

  def save_with_record(record, record_params)
    transaction do
      unless self.save
        raise ActiveRecord::Rollback
      end

      record.assign_attributes(record_params)
      unless record.save
        record.errors.each do |key, message|
          errors.add(key, message)
        end

        raise ActiveRecord::Rollback
      end
    end

    errors.empty?
  end

  def destroy_with_record
    record = local_records.first
    if record.roadmap_ids.any?
      record = records.build(
        platform_ids: record.platform_ids,
        upstream_ids: record.upstream_ids,
        title: record.title,
        description: record.description,
        label_ids: record.label_ids,
        label_descriptions: record.label_descriptions,
      )
      local_records.unshift(record)
    end

    record.deleted_at ||= Time.current
    save_with_record(record, {})
  end

  def local_records
    return @local_records if defined?(@local_records)
    @local_records = records.sort_by(&:sort_key)
    @local_records
  end

  def local_records=(records)
    @local_records = records
  end
end
