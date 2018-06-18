class Project < ApplicationRecord
  has_many :test_cases, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :plans, dependent: :destroy
  has_many :users, dependent: :destroy
  has_many :issues, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :milestones, dependent: :destroy
  has_many :platforms, dependent: :destroy
  has_many :components, dependent: :destroy
end
