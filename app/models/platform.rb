# == Schema Information
#
# Table name: platforms
#
#  id                  :bigint           not null, primary key
#  name                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  archived            :boolean          default(FALSE)
#  project_id          :bigint
#  default_assignee_id :bigint
#  icon_svg            :string
#

class Platform < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :default_assignee, class_name: Member.to_s, optional: true
  belongs_to :project

  validates :name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :connect_test_cases, -> {
    self.joins("INNER JOIN platforms_test_cases ON platforms.id=platforms_test_cases.platform_id")
        .where("test_cases.id=platforms_test_cases.test_case_id")
  }

  def test_cases
    TestCase.where("platform_ids @> ARRAY[#{id}]::bigint[]")
  end

  def archive
    update(archived: true)
  end

  def to_label
    " #{name}"
  end
end
