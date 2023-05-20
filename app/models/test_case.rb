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
  has_many :versionables, dependent: :destroy
  has_many :labels, through: :test_case_label_links, source: :test_case_label

  cleanup_column :title, :content

  validates :title, :folder_id, :platform_ids, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :with_folder, -> { joins(:folder).includes(:folder) }

  after_create :sync_to_processing_plan
  after_save :sync_current_versionable_to_history

  def archive
    update(archived: true)
  end

  def sync_to_processing_plan
    # append self to current test plan
    Plan.recent.select { |it| !it.finished? }.each do |plan|
      (plan.platforms & self.platforms).each do |platform|
        plan.phases.each do |phase|
          phase.tasks.create!(test_case: self, plan: plan, platform: platform)
        end
      end
    end
  end

  def sync_current_versionable_to_history
    current_versionable = self.versionables.with_category(:current).first
    return unless current_versionable

    current_version = self.versions.find { |version| version.reify.updated_at == current_versionable.case_updated_at }
    return unless current_version

    current_versionable.update!(history_id: current_version.id, category: :history)
  end
end
