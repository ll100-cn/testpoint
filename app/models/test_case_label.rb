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
  # has_many :test_case_label_links, dependent: :destroy
  # belongs_to_array_in_many :test_cases, foreign_key: :label_ids

  validates :name, presence: true

  def test_cases
    TestCase.where("label_ids @> ARRAY[#{id}]::bigint[]")
  end
end
