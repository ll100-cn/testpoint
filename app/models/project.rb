# == Schema Information
#
# Table name: projects
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Project < ApplicationRecord
  has_many :test_cases, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :plans, dependent: :destroy
  has_many :users, dependent: :destroy
  has_many :issues, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :milestones, dependent: :destroy
  has_many :platforms, dependent: :destroy
  has_many :components, dependent: :destroy

  has_many :members, dependent: :destroy

  def remove_member(user)
    members.delete(user) if members.include?(user)
  end

  def change_member_role
    members.each do |member|
      member.update(role: "member") if members.include?(member) && !member.admin?
    end
  end
end
