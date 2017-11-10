# == Schema Information
#
# Table name: issues
#
#  id         :integer          not null, primary key
#  title      :string
#  content    :text
#  state      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Issue < ApplicationRecord
  extend Enumerize

  enumerize :state, in: [:open, :close], default: :open

  has_many :tasks

  def title
    tasks.map do |task|
      test_case = task.test_case
      "#{test_case.component.name}-#{test_case.title}"
    end.join
  end

  def content
    tasks.flat_map(&:task_attachments).flat_map(&:content).join("\r\n")
  end
end
