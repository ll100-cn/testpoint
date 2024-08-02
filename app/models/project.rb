# == Schema Information
#
# Table name: projects
#
#  id               :bigint           not null, primary key
#  name             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  archived         :boolean          default(FALSE)
#  trello_list_id   :string
#  trello_api_key   :string
#  trello_api_token :string
#  webhook_url      :string
#

class Project < ApplicationRecord
  has_many :test_cases,          dependent: :destroy
  has_many :plans,               dependent: :destroy
  has_many :tasks, through: :plans
  has_many :issues,              dependent: :destroy
  has_many :issue_templates,     dependent: :destroy
  has_many :categories,          dependent: :destroy
  has_many :test_case_labels,    dependent: :destroy
  has_many :test_case_snapshots, dependent: :destroy
  has_many :milestones,          dependent: :destroy
  has_many :platforms,           dependent: :destroy
  has_many :folders,             dependent: :destroy
  has_many :members,             dependent: :destroy
  has_many :requirements,        dependent: :destroy
  has_many :storyboards,         dependent: :destroy

  accepts_nested_attributes_for :members
  has_many :users, through: :members

  cleanup_column :trello_list_id, :trello_api_key, :trello_api_token

  scope :available, -> { where(archived: false) }
  scope :ranked, -> { order("name") }

  def subscribed_users
    members.where(receive_mail: true).map(&:user)
  end

  def available_subscribed_users
    members.where(receive_mail: true, archived_at: nil).map(&:user)
  end

  def available_issue_assignees_with_group
    members.where.not(role: :reporter)
      .sort_by { |x| x.role.developer? ? 0 : 1 }
      .group_by(&:role_text)
  end

  def archive
    self.archived = true
    self.save
  end
end
