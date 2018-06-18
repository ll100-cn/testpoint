# == Schema Information
#
# Table name: issues
#
#  id         :integer          not null, primary key
#  title      :string
#  content    :text
#  state      :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Issue < ApplicationRecord
  extend Enumerize

  enumerize :state, in: [:open, :closed, :solved], default: :open

  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :issues_labels, dependent: :destroy
  has_many :labels, through: :issues_labels
  belongs_to :milestone, optional: true
  belongs_to :creator, class_name: User.to_s
  belongs_to :assignee, class_name: User.to_s, optional: true
  belongs_to :project

  scope :with_labels, -> { includes(:labels) }

  def default_title
    tasks.map do |task|
      test_case = task.test_case
      "#{test_case.component.name}-#{test_case.title}"
    end.join(" ")
  end
end
