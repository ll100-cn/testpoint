# == Schema Information
#
# Table name: folders
#
#  id         :bigint           not null, primary key
#  name       :string
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#  project_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Folder < ApplicationRecord
  has_ancestry

  has_many :test_cases, dependent: :restrict_with_error
  belongs_to :project

  validates :name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :ranked, -> { order(:name) }

  def to_label
    "　" * ancestor_ids.size + name
  end

  def ancestor_ids_with_self
    [id] + ancestor_ids
  end
end
