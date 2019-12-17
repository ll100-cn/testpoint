# == Schema Information
#
# Table name: folders
#
#  id         :bigint           not null, primary key
#  name       :string
#  ancestry   :string
#  project_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  syscode    :string
#

class Folder < ApplicationRecord
  has_ancestry

  has_many :test_cases, dependent: :restrict_with_error
  belongs_to :project

  validates :name, presence: true

  scope :available, -> {
    self.where("syscode IS NULL OR syscode <> 'ARCHIVED_ROOT'")
        .where("ancestry IS NULL OR (NOT EXISTS (
          SELECT 1 FROM folders as roots
          WHERE roots.syscode = 'ARCHIVED_ROOT'
            AND roots.id::TEXT = SPLIT_PART(folders.ancestry, '/', 1)
        ))") }

  scope :archived, -> { where(archived: true) }
  scope :ranked, -> { order("syscode NULLS FIRST").order(Arel.sql("CONCAT(ancestry, id)")) }

  def to_label
    "　" * ancestor_ids.size + name
  end

  def ancestor_ids_with_self
    [id] + ancestor_ids
  end

  def archive
    return true if archived_root?

    archived_root = project.folders.where(syscode: 'ARCHIVED_ROOT').first_or_create!(name: "ARCHIVED")
    self.parent = archived_root
    self.save
  end

  def archived_root?
    syscode == "ARCHIVED_ROOT"
  end

  def self.descendants_with_self_counts(collection, resources_counts)
    collection.each_with_object({}) do |folder, result|
      count = resources_counts[folder.id] || 0
      result.merge!(folder.ancestor_ids_with_self.product([count]).to_h) { |key, old, new| old + new }
    end
  end
end
