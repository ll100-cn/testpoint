class Label < ApplicationRecord
  has_many :issues_labels, dependent: :destroy
  has_many :issues, through: :issues_labels
  belongs_to :project

  validates :name, presence: true
end
