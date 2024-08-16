# == Schema Information
#
# Table name: test_cases
#
#  id             :bigint           not null, primary key
#  title          :string
#  content        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  bak_folder_id  :bigint
#  archived       :boolean          default(FALSE)
#  project_id     :bigint
#  role_name      :string
#  scene_name     :string
#  group_name     :string
#  archived_at    :datetime
#  platform_ids   :bigint           default([]), is an Array
#  label_ids      :bigint           default([]), is an Array
#  roadmap_id     :bigint
#  storyboard_id  :bigint
#  requirement_id :bigint
#

class TestCase < ApplicationRecord
  # belongs_to :folder, optional: true
  # has_and_belongs_to_many :platforms
  belongs_to :project
  belongs_to :requirement, optional: true
  belongs_to :roadmap, optional: true
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

  validates :title, :platform_ids, presence: true
  validates :scene_name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :with_folder, -> { joins(:folder).includes(:folder) }

  after_create :sync_to_processing_plan

  def archive
    update(archived: true, archived_at: Time.current)
  end

  def sync_to_processing_plan
    # append self to current test plan
    Plan.recent.reject(&:finished?).each do |plan|
      plan.phases.each do |phase|
        phase.tasks.create!(test_case: self, plan: plan)
      end
    end
  end

  def scene_path
    (scene_name || "N/A").split(' | ')
  end

  def self.filter_by_version_at(base_scope, version_at)
    test_cases_scope = base_scope

    test_cases_scope = test_cases_scope.where("test_cases.created_at <= ?", version_at)
    join_sub_query = TestCaseVersion.from("versions as v1").joins("INNER JOIN test_cases ON test_cases.id = v1.item_id AND v1.item_type = 'TestCase'")
                                                           .merge(test_cases_scope)
                                                           .where("v1.created_at >= ?", version_at)
                                                           .group("v1.item_id")
                                                           .select("MIN(v1.created_at) as created_at, v1.item_id")

    test_case_versions = TestCaseVersion.where(item_type: 'TestCase')
                                        .joins("INNER JOIN (#{join_sub_query.to_sql}) as v2 ON v2.item_id = versions.item_id AND v2.created_at = versions.created_at")
                                        .al_to_scope(:main)

    test_case_versions.al_preload_all(:item, test_cases_scope)
    version_mapping = test_case_versions.to_a.index_by(&:item_id)

    test_cases_scope.map do |test_case|
      if version_mapping.key?(test_case.id)
        version = version_mapping[test_case.id]
        version.al_load(:item)
        version.reify_with_create
      else
        test_case
      end
    end
  end

  def self.filter_by_label_id(label_id)
    where("label_ids @> ARRAY[?]::bigint[]", label_id)
  end

  def self.filter_by_platform_id(platform_id)
    where("platform_ids @> ARRAY[?]::bigint[]", platform_id)
  end

  def self.ransackable_scopes(auth_object = nil)
    [ :filter_by_label_id, :filter_by_platform_id ]
  end

  def create_with_requirement
    if requirement_id.present?
      self.roadmap = Roadmap.ranked.first
    end

    self.save
  end

  def update_with_requirement(params)
    assign_attributes(params)

    if requirement_id.present?
      self.roadmap = Roadmap.ranked.first
    end

    self.save
  end
end
