# == Schema Information
#
# Table name: test_cases
#
#  id           :bigint           not null, primary key
#  title        :string
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  folder_id    :bigint
#  archived     :boolean          default(FALSE)
#  project_id   :bigint
#  role_name    :string
#  scene_name   :string
#  group_name   :string
#  archived_at  :datetime
#  platform_ids :bigint           default([]), is an Array
#  label_ids    :bigint           default([]), is an Array
#

class TestCase < ApplicationRecord
  # belongs_to :folder, optional: true
  # has_and_belongs_to_many :platforms
  belongs_to :project
  has_array_of :platforms, class_name: 'Platform'
  has_array_of :labels, class_name: 'TestCaseLabel'
  # has_many :test_case_versions, dependent: :destroy
  # has_many :test_case_label_links, dependent: :destroy
  # has_many :test_case_records, dependent: :destroy
  # has_many :labels, through: :test_case_label_links, source: :test_case_label

  has_paper_trail versions: {
    inverse_of: :item,
    class_name: 'TestCaseVersion'
  }

  cleanup_column :title, :content, :role_name, :scene_name, :group_name

  validates :title, :folder_id, :platform_ids, presence: true
  validates :scene_name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :with_folder, -> { joins(:folder).includes(:folder) }

  after_create :sync_to_processing_plan

  def archive
    update(archived: true)
  end

  def sync_to_processing_plan
    # append self to current test plan
    Plan.recent.reject(&:finished?).each do |plan|
      (plan.platforms & self.platforms).each do |platform|
        plan.phases.each do |phase|
          phase.tasks.create!(test_case: self, plan: plan, platform: platform)
        end
      end
    end
  end

  def scene_path
    (scene_name || "N/A").split(' | ')
  end
end
