# == Schema Information
#
# Table name: labels
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :text
#  color       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :bigint
#

class Label < ApplicationRecord
  has_many :issues_labels, dependent: :destroy
  has_many :issues, through: :issues_labels
  belongs_to :project

  validates :name, presence: true
end
