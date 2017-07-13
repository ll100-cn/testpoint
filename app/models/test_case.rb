# == Schema Information
#
# Table name: test_cases
#
#  id         :integer          not null, primary key
#  title      :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TestCase < ApplicationRecord
  validates :title, :content, presence: true
end
