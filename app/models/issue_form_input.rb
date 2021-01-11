class IssueFormInput
  include ActiveAttr::Model

  attribute :template_input
  attribute :form
  attribute :value

  validates :value, presence: true

  def label
    template_input.label
  end

  def template_input_id
    template_input.id
  end

  def self.build(form, template_input)
    record = IssueFormInput.new(template_input: template_input, form: form)
    values = form.values || {}
    record.value = values[template_input.id.to_s]
    record
  end
end
