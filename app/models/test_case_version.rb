# == Schema Information
#
# Table name: test_case_versions
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TestCaseVersion < ApplicationRecord
  belongs_to :project
  has_many :versionables, dependent: :destroy

  validates :title, presence: true
end
