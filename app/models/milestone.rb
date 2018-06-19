class Milestone < ApplicationRecord
  has_many :issues, dependent: :nullify
  belongs_to :project

  validates :title, presence: true
end
