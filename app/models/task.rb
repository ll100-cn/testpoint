# == Schema Information
#
# Table name: tasks
#
#  id           :bigint(8)        not null, primary key
#  test_case_id :bigint(8)
#  plan_id      :bigint(8)
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  platform_id  :bigint(8)
#  issue_id     :bigint(8)
#  message      :text
#

class Task < ApplicationRecord
  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
  belongs_to :platform
  belongs_to :issue, optional: true

  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable

  validate :issue_must_exist, if: -> { issue_id.present? }

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :folder).includes(test_case: :folder) }

  def issue_must_exist
    errors.add(:issue_id, :invalid) if Issue.where(id: issue_id).none?
  end

  def test_case_when_finishing
    test_case.paper_trail.version_at(test_case_version)
  end

  def finished?
    ["pass", "failure"].include? state
  end

  def changed_after_finish?
    !test_case.paper_trail.version_at(test_case_version).version.nil?
  end
end
