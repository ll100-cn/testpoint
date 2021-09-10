# == Schema Information
#
# Table name: task_upshots
#
#  id               :bigint           not null, primary key
#  task_id          :bigint           not null
#  phase_id         :bigint           not null
#  state_override   :string
#  state_changed_at :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  content          :text
#  state            :string
#
require 'rails_helper'

RSpec.describe TaskUpshot, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
