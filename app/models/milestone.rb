class Milestone < ApplicationRecord
  has_many :issues, dependent: :nullify

  validates :title, presence: true
end
