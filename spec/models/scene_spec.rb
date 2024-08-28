# == Schema Information
#
# Table name: scenes
#
#  id            :bigint           not null, primary key
#  storyboard_id :bigint           not null
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'rails_helper'

RSpec.describe Scene, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
