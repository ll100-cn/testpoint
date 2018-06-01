class Label < ApplicationRecord
  has_many :issues_labels
  has_many :issues, through: :issues_labels

  validates :name, presence: true
end
