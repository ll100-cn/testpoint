# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Project < ApplicationRecord
  has_many :test_cases,         dependent: :destroy
  has_many :plans,              dependent: :destroy
  has_many :issues,             dependent: :destroy
  has_many :labels,             dependent: :destroy
  has_many :test_case_labels,   dependent: :destroy
  has_many :milestones,         dependent: :destroy
  has_many :platforms,          dependent: :destroy
  has_many :folders,            dependent: :destroy
  has_many :members,            dependent: :destroy

  accepts_nested_attributes_for :members
  has_many :users, through: :members
end
