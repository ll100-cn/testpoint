# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  test_case_id :integer
#  plan_id      :integer
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Task < ApplicationRecord
  extend Enumerize

  enumerize :state, in: [ :pending, :pass, :failure ], default: :pending

  belongs_to :test_case
  belongs_to :plan
end
