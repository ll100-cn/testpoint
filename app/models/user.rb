# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  name                   :string
#  superadmin             :boolean          default(FALSE)
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable, :recoverable, :confirmable,
         reconfirmable: false

  has_many :created_issues, class_name: Issue.to_s, foreign_key: 'creator_id', dependent: :destroy, inverse_of: true
  has_many :assigned_issues, class_name: Issue.to_s, foreign_key: 'assignee_id', dependent: :destroy, inverse_of: true
  has_many :members, dependent: :destroy
  has_many :projects, through: :members
  has_many :subscriptions, dependent: :destroy
  attr_writer :current_password

  validates :name, presence: true, length: { minimum: 2 }

  after_initialize :skip_confirmation_notification!

  def password_required?
    new_record? || password.present? || password_confirmation.present?
  end

  def avatar_url(size = 200)
    gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
    "https://www.gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end

  def subscribed?(issue)
    subscriptions.exists?(issue_id: issue)
  end

  def send_activation_instructions
    token = set_reset_password_token
    send_devise_notification(:activation_instructions, token, {})
  end

  def devise_mailer
    UserMailer
  end

end
