# == Schema Information
#
# Table name: platforms
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#

class Platform < ApplicationRecord
  has_many :tasks
  has_and_belongs_to_many :test_cases
  validates :name, presence: true

  scope :available, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :connect_test_cases, -> {
    self.joins("INNER JOIN platforms_test_cases ON platforms.id=platforms_test_cases.platform_id")
        .where("test_cases.id=platforms_test_cases.test_case_id")
  }

  def archive
    update(archived: true)
  end

  def to_label
    " #{name}"
  end
end
