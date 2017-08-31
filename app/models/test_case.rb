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
#

class TestCase < ApplicationRecord
  belongs_to :component
  has_and_belongs_to_many :platforms

  cleanup_column :title, :content

  validates :title, :content, :component_id, :platform_ids, presence: true
end
