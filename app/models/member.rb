# == Schema Information
#
# Table name: members
#
#  id         :bigint(8)        not null, primary key
#  role       :string
#  project_id :bigint(8)
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  nickname   :string
#

class Member < ApplicationRecord
  enumerize :role, in: [:owner, :manager, :developer, :reporter], default: :developer
  belongs_to :user
  belongs_to :project
  has_many :issue_relationships, dependent: :destroy
  attr_accessor :email, :name

  cleanup_column :nickname

  validates :user_id, uniqueness: { scope: :project_id }

  def submit
    password = SecureRandom.hex(4)
    user = User.where(email: email).first_or_initialize(name: name, password: password, password_confirmation: password)
    transaction do
      if user.new_record? && !user.save
        delegate_errors(user, self, [ :email, :name ], :email)
        raise ActiveRecord::Rollback
      end

      self.user = user
      self.nickname = name if self.user.name != name

      unless self.save
        delegate_errors(self, self, user_id: :email)
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

  def smart_name
    nickname || user.name
  end
end
