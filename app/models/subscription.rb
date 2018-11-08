class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :issue
  validates :user_id, presence: true, uniqueness: { scope: :issue_id }
end
