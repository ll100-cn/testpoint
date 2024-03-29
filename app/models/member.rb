# == Schema Information
#
# Table name: members
#
#  id           :bigint           not null, primary key
#  role         :string
#  project_id   :bigint
#  user_id      :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  nickname     :string
#  receive_mail :boolean          default(FALSE)
#  archived_at  :datetime
#

class Member < ApplicationRecord
  enumerize :role, in: [:owner, :manager, :developer, :reporter], default: :developer
  belongs_to :user
  belongs_to :project
  has_many :issues, foreign_key: :creator_id, dependent: :restrict_with_error
  has_many :comments,                         dependent: :restrict_with_error
  has_many :issue_relationships,              dependent: :restrict_with_error
  has_many :issue_activities,                 dependent: :restrict_with_error

  attr_accessor :user_email

  cleanup_column :nickname

  validates :user_id, uniqueness: { scope: :project_id }

  scope :chief, -> { where(role: [ "owner", "manager" ]) }
  scope :ranked, -> { order(:id) }
  scope :available, -> { where(archived_at: nil) }

  def submit_and_save
    self.user = User.find_by(email: user_email) || User.new(name: nickname, email: user_email)
    transaction do
      if self.user.new_record? && !self.user.save
        delegate_errors(user, self, [[:email, :user_email], [:name, :nickname]], nil)
        raise ActiveRecord::Rollback
      end

      self.nickname = nickname if self.user.name != nickname

      unless self.save
        delegate_errors(self, self, user_id: :user_email)
        raise ActiveRecord::Rollback
      end
    end

    errors.empty?
  end

  def delegate_errors(source, target, mapping, other = nil)
    errors = source.errors.dup
    mapping.each do |pair|
      name, dest = [ pair ].flatten
      if (messages = errors.delete(name).presence)
        messages.each { |message| target.errors.add(dest || name, message) }
      end
    end

    if other
      errors.full_messages.each { |message| target.errors.add(other, message) }
    end
  end

  def subscribe(issue)
    user.subscribe(issue)
  end

  def subscribed?(issue)
    user.subscribed?(issue)
  end

  def email
    user.email
  end

  def name
    nickname || user.name
  end

  def archive
    update(archived_at: Time.current)
  end
end
