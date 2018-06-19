# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
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
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  extend Enumerize

  enumerize :role, in: [:admin, :member, :visitor], default: :visitor

  has_many :comments, dependent: :destroy
  has_many :created_issues, class_name: Issue.to_s, foreign_key: 'creator_id', dependent: :destroy, inverse_of: true
  has_many :assigned_issues, class_name: Issue.to_s, foreign_key: 'assignee_id', dependent: :destroy, inverse_of: true
  has_many :projects_users, dependent: :destroy
  has_many :participated_projects, through: :projects_users, source: :project
  attr_writer :current_password

  validates :name, presence: true

  def password_required?
    new_record? || password.present? || password_confirmation.present?
  end

  def avatar_url(size = 200)
    gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
    "https://www.gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end

  def self.check_role(role_item)
    define_method("#{role_item}?") do
      role == role_item
    end
  end

  self.role.values.each do |role|
    check_role(role)
  end
end
