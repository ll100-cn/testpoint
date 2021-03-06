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
  has_many :labels, through: :test_case_label_links, source: :test_case_label

  cleanup_column :title, :content

  validates :title, :folder_id, :platform_ids, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :with_folder, -> { joins(:folder).includes(:folder) }

  def archive
    update(archived: true)
  end
end
