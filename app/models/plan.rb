# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Plan < ApplicationRecord
  has_many :tasks
  has_many :test_cases, through: :tasks
  has_many :components, through: :test_cases
  validates :title, presence: true

  attr_accessor :platform_ids

  def generate(params)
    test_cases = TestCase.where(id: params[:test_case_ids])
    test_cases.each do |test_case|
      test_case.platform_ids.each do |platform_id|
        tasks.new(test_case_id: test_case.id, platform_id: platform_id)
      end
    end

    save
  end
end
