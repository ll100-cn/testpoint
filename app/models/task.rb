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
#  message           :text
#  test_case_version :datetime
#  content           :text
#  phase_id          :bigint
#

class Task < ApplicationRecord
  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
  belongs_to :phase
  belongs_to :platform
  has_many :issues
  has_many :upshots, class_name: "TaskUpshot"

  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable

  scope :ranked, -> { order(:created_at) }
  scope :with_platform, -> { joins(:platform).includes(:platform) }
  scope :with_test_case, -> { joins(test_case: :folder).includes(test_case: :folder) }

  accepts_nested_attributes_for :issues

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
