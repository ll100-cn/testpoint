# == Schema Information
#
# Table name: components
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#

require 'rails_helper'

RSpec.describe Component, type: :model do
end
