# == Schema Information
#
# Table name: issue_infos
#
#  id          :bigint           not null, primary key
#  issue_id    :bigint           not null
#  template_id :bigint           not null
#  state       :string
#  values      :json
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  remark      :string
#

class IssueInfo < ApplicationRecord
  belongs_to :issue
  belongs_to :template, class_name: "IssueTemplate"

  enumerize :state, in: [:pending, :submitted], default: :pending

  scope :ranked, -> { order(:created_at) }

  def submit_and_save
    inputs.each do |input|
      if input.valid?
        self.values[input.template_input_id] = input.value
      else
        self.errors.add(:inputs, :invalid)
      end
    end

    return false if self.errors.any?

    self.state = :submitted
    self.save
  end

  def inputs
    @inputs ||= template.inputs.map { |input| IssueInfoInput.build(self, input) }
  end

  def inputs_attributes=(params)
    new_attrs = params.values.dup.each_with_object({}) do |input_params, result|
      key = input_params.delete(:template_input_id).to_i
      result[key] = input_params
    end

    inputs.each do |input|
      attrs = new_attrs[input.template_input_id] || {}
      input.assign_attributes(attrs)
    end
  end
end
