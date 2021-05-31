# == Schema Information
#
# Table name: plans
#
#  id           :bigint           not null, primary key
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  archived     :boolean          default(FALSE)
#  start_at     :datetime
#  project_id   :bigint
#  creator_id   :bigint           not null
#  milestone_id :bigint
#

class Plan < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :test_cases, through: :tasks
  has_many :folders, through: :test_cases
  belongs_to :project
  belongs_to :creator, class_name: "Member", foreign_key: "creator_id"
  belongs_to :milestone, optional: true

  validates :title, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :ranked, -> { order(:created_at).reverse_order }

  def submit(test_case_filter)
    test_cases = test_case_filter.build_test_cases_scope(project.test_cases.available)
    platforms = project.platforms
    platforms = platforms.where(id: test_case_filter.platform_ids) if test_case_filter.platform_ids.present?
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
