# == Schema Information
#
# Table name: plan_phases
#
#  id           :bigint           not null, primary key
#  title        :string
#  plan_id      :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  app_revision :string
#
require 'rails_helper'

RSpec.describe PlanPhase, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
