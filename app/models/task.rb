# == Schema Information
#
# Table name: tasks
#
#  id                :bigint           not null, primary key
#  test_case_id      :bigint
#  plan_id           :bigint
#  state             :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  platform_id       :bigint
#  issue_id          :bigint
#  message           :text
#  test_case_version :datetime
#  content           :text
#

class Task < ApplicationRecord
  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
  belongs_to :platform
  belongs_to :issue, optional: true

  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable

  validate :issue_must_exist, if: -> { issue_id.present? }
  validates :message, presence: true, if: -> { state.failure? }

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :folder).includes(test_case: :folder) }

  def issue_must_exist
    errors.add(:issue_id, :invalid) if Issue.where(id: issue_id).none?
  end

  def test_case_snapshot
    test_case.paper_trail.version_at(test_case_version)
  end

  def finished?
    state.pass? || state.failure?
  end

  def test_case_changed_after_finish?
    return false unless finished?
    !test_case.paper_trail.version_at(test_case_version).version.nil?
  end
end
