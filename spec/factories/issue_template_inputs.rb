# == Schema Information
#
# Table name: issue_template_inputs
#
#  id          :bigint           not null, primary key
#  template_id :bigint
#  label       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  order_index :integer
#

FactoryBot.define do
  factory :issue_template_input do
    label { "应用版本" }
    template
  end
end
