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
  validates :title, presence: true

  def generate(params)
    self.test_case_ids = params[:test_case_ids]
    save
  end
end
