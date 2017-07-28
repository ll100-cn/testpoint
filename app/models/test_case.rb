# == Schema Information
#
# Table name: test_cases
#
#  id           :integer          not null, primary key
#  title        :string
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :integer
#  platform_id  :integer
#

class TestCase < ApplicationRecord
  belongs_to :component
  belongs_to :platform

  validates :title, :content, :component_id, :platform_id, presence: true
end
