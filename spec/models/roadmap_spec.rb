# == Schema Information
#
# Table name: roadmaps
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Roadmap, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
