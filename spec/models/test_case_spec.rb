# == Schema Information
#
# Table name: test_cases
#
#  id           :integer          not null, primary key
#  title        :string
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :integer
#  platform_id  :integer
#

require 'rails_helper'

RSpec.describe TestCase, type: :model do
end
