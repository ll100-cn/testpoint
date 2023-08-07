# == Schema Information
#
# Table name: test_cases
#
#  id         :bigint           not null, primary key
#  title      :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  folder_id  :bigint
#  archived   :boolean          default(FALSE)
#  project_id :bigint
#

class TestCase < ApplicationRecord
  has_paper_trail
  belongs_to :folder
  has_and_belongs_to_many :platforms
  belongs_to :project
  has_many :test_case_label_links, dependent: :destroy
  has_many :test_case_records, dependent: :destroy
  has_many :labels, through: :test_case_label_links, source: :test_case_label

  cleanup_column :title, :content, :role_name, :scene_name, :group_name

  validates :title, :folder_id, :platform_ids, presence: true
  validates :scene_name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :with_folder, -> { joins(:folder).includes(:folder) }

  after_create :sync_to_processing_plan
  after_save :save_to_record

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

  def save_to_record
    test_case_records.create!(changed_at: self.versions.last.reify.updated_at) if self.versions.last&.reify
  end

  def scene_path
    scene_name.split(' | ')
  end
end
