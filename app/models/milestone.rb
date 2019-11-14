# == Schema Information
#
# Table name: milestones
#
#  id          :bigint           not null, primary key
#  title       :string
#  end_time    :datetime
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  start_time  :datetime
#  project_id  :bigint
#

class Milestone < ApplicationRecord
  has_many :issues, dependent: :nullify
  belongs_to :project

  validates :title, presence: true
end
