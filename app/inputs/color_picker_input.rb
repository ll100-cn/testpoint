class ColorPickerInput < SimpleForm::Inputs::Base
  def input(_wrapper_options)
    template.content_tag(:div, class: 'input-group color-picker') do
      template.concat @builder.text_field(attribute_name, input_html_options)
    end
  end

  def input_html_options
    super.merge(class: 'form-control p-0', type: "color")
  end
end
