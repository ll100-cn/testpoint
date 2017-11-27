# == Schema Information
#
# Table name: components
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#

class Component < ApplicationRecord
  has_ancestry

  has_many :test_cases

  validates :name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }

  def archive
    update(archived: true)
  end

  def self.ranked
    order(:name).sort_by { |c| c.ancestor_ids + [c.id] }
  end

  def to_label
    "　" * ancestor_ids.size + name
  end

  def ancestor_ids_with_self
    [id] + ancestor_ids
  end
end
