# == Schema Information
#
# Table name: versionables
#
#  id                   :bigint           not null, primary key
#  test_case_version_id :bigint           not null
#  test_case_id         :bigint           not null
#  history_id           :integer
#  category             :string
#  case_updated_at      :datetime
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class Versionable < ApplicationRecord
  enumerize :category, in: [:current, :history], scope: true

  belongs_to :test_case_version
  belongs_to :test_case

  validates :category, presence: true

  scope :ranked, -> { order(:created_at) }

  before_save :set_case_updated_at

  def set_case_updated_at
    return if self.case_updated_at? || self.category.history?

    self.case_updated_at = self.test_case.updated_at
  end
end
