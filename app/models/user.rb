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
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :registerable, :recoverable
  devise :code_authenticatable, :trackable

  has_many :created_issues, class_name: Issue.to_s, foreign_key: 'creator_id', dependent: :destroy, inverse_of: true
  has_many :assigned_issues, class_name: Issue.to_s, foreign_key: 'assignee_id', dependent: :destroy, inverse_of: true
  has_many :members, dependent: :destroy
  has_many :projects, through: :members
  has_many :subscriptions, dependent: :destroy

  validates :name, presence: true, length: { minimum: 2 }

  def avatar_url(size = 200)
    gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
    "https://www.gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end

  def subscribed?(issue)
    subscriptions.exists?(issue_id: issue)
  end

  def devise_mailer
    UserMailer
  end

end
