# == Schema Information
#
# Table name: test_case_versions
#
#  id          :bigint           not null, primary key
#  project_id  :bigint
#  title       :string
#  version_at  :datetime
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class TestCaseVersion < ApplicationRecord
  belongs_to :project

  scope :ranked, -> { order(version_at: :desc) }

  def fullname
    "#{title} #{version_at.strftime('%Y-%m-%d')}"
  end
end
