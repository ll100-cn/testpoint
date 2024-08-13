# == Schema Information
#
# Table name: roadmaps
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Roadmap < ApplicationRecord
  belongs_to :project

  validates :title, presence: true

  scope :ranked, -> { order(id: :desc) }

  def submit
    unless self.new_record?
      errors.add(:base, :invalid)
      return false
    end

    transaction do
      unless save
        raise ActiveRecord::Rollback
      end

      requirement_records_scope = RequirementRecord.joins(:requirement).merge(project.requirements)
      requirement_records_scope.where(roadmap_ids: []).update_all(roadmap_ids: [self.id])

      prev_roadmap = project.roadmaps.ranked.first
      if prev_roadmap
        requirement_records_scope.where(deleted_at: nil).where("? = ANY(roadmap_ids)", prev_roadmap.id).update_all(["roadmap_ids = ARRAY_APPEND(roadmap_ids, ?::bigint)", self.id])
      end
    end
  end
end
