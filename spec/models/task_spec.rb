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
#  platform_id  :integer
#  issue_id     :integer
#

require 'rails_helper'

RSpec.describe Task, type: :model do
end
