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
class PlanPhase < ApplicationRecord
  belongs_to :plan
  has_many :tasks
end
