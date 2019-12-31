# == Schema Information
#
# Table name: test_case_labels
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :text
#  project_id  :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TestCaseLabel < ApplicationRecord
  belongs_to :project
  has_many :test_case_label_links, dependent: :destroy
  has_many :test_cases, through: :test_case_label_links

  validates :name, presence: true
end
