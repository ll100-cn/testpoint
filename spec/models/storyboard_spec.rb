# == Schema Information
#
# Table name: storyboards
#
#  id          :bigint           not null, primary key
#  project_id  :bigint           not null
#  title       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  main_axle   :string
#  positions   :json
#
require 'rails_helper'

RSpec.describe Storyboard, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
