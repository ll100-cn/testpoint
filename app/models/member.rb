# == Schema Information
#
# Table name: members
#
#  id         :bigint(8)        not null, primary key
#  role       :string
#  project_id :bigint(8)
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Member < ApplicationRecord
  enumerize :role, in: [:owner, :admin, :member], default: :member
  belongs_to :user
  belongs_to :project

  validates :user_id, uniqueness: { scope: :project_id }
end
