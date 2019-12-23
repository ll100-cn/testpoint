# == Schema Information
#
# Table name: plans
#
#  id         :bigint           not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#  start_at   :datetime
#  project_id :bigint
#

class Plan < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :test_cases, through: :tasks
  has_many :folders, through: :test_cases
  belongs_to :project

  validates :title, presence: true

  attr_accessor :platform_ids

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :ranked, -> { order(:created_at).reverse_order }

  def generate(params)
    test_cases = TestCase.available.where(id: params[:test_case_ids])
    platforms = Platform.available.where(id: params[:platform_ids])
    platforms.each do |platform|
      test_cases.each do |test_case|
        if test_case.platforms.exists? platform.id
          tasks.new(test_case_id: test_case.id, platform: platform)
        end
      end
    end

    save
  end

  def archive
    update(archived: true)
  end
end
