# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  email               :string           default(""), not null
#  remember_created_at :datetime
#  sign_in_count       :integer          default(0), not null
#  current_sign_in_at  :datetime
#  last_sign_in_at     :datetime
#  current_sign_in_ip  :inet
#  last_sign_in_ip     :inet
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  name                :string
#  superadmin          :boolean          default(FALSE)
#  remember_token      :string
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :registerable, :recoverable
  devise :code_authenticatable, :rememberable, :trackable
  has_many :members, dependent: :destroy
  has_many :projects, through: :members
  has_many :subscriptions, dependent: :destroy

  validates :name, presence: true, uniqueness: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true

  def avatar_url(size = 200)
    gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
    "https://www.gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end

  def subscribe(resource)
    if resource.is_a? Issue
      return true if subscribed?(resource)
      return subscriptions.create(issue: resource)
    end

    if resource.is_a? Project
      members.where(project: resource).update_all(receive_mail: true)
    end
  end

  def unsubscribe(resource)
    if resource.is_a? Issue
      subscriptions.where(issue: resource).destroy_all
    end

    if resource.is_a? Project
      members.where(project: resource).update_all(receive_mail: false)
    end
  end

  def subscribed?(resource)
    if resource.is_a? Issue
      return subscriptions.exists?(issue_id: resource)
    end

    if resource.is_a? Project
      members.where(project: resource).any?(&:receive_mail?)
    end
  end

  def available_projects
    Project.available.where_exists(members.available.where_table(:project))
  end
end
