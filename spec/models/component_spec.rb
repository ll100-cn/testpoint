# == Schema Information
#
# Table name: components
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#

require 'rails_helper'

RSpec.describe Component, type: :model do
end
