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

  has_many :comments, dependent: :destroy

  after_validation :generate_username, on: :create

  def display_user_name
    if self.username.present?
      self.username
    else
      self.email.split('@').first
    end
  end

  def generate_username
    self.username = self.email.split('@').first if self.username.blank?
  end
end
