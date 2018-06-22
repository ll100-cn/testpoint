# == Schema Information
#
# Table name: plans
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#  start_at   :datetime
#  project_id :bigint(8)
#

class Plan < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :test_cases, through: :tasks
  has_many :components, through: :test_cases
  belongs_to :project

  validates :title, presence: true

  attr_accessor :platform_ids

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }

  def generate(params)
    test_cases = TestCase.available.where(id: params[:test_case_ids], project_id: params[:project_id])
    test_cases.each do |test_case|
      test_case.platform_ids.each do |platform_id|
        tasks.new(test_case_id: test_case.id, platform_id: platform_id, project_id: params[:project_id])
      end
    end
    save
  end

  def archive
    update(archived: true)
  end
end
