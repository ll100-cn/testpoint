class Milestone < ApplicationRecord
  has_many :issues, dependent: :destroy
  validates :title, presence: true
end
