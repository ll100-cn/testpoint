# == Schema Information
#
# Table name: roadmaps
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Roadmap < ApplicationRecord
  belongs_to :project

  validates :title, presence: true
end
