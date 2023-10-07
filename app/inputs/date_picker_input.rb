class DatePickerInput < SimpleForm::Inputs::Base

  def input(wrapper_config)
    value = object.send(attribute_name)
    input_html_options[:value] ||= localized(value, wrapper_attributes[:data]["alt-format"])
    input_html_options[:class] << "form-control"
    input_html_options[:'data-input'] = true

    @builder.template.content_tag("div", wrapper_attributes) do
      @builder.text_field(attribute_name, input_html_options) + icon_tag
    end
  end

protected

  def icon_tag
    content = <<~HTML
      <a class="input-group-text" data-toggle>
        <span class="far fa-fw fa-calendar-alt"></span>
      </a>
    HTML
    content.html_safe
  end

  def wrapper_attributes
    attributes = input_html_options.slice(:data)
    attributes[:data] ||= {}
    attributes[:class] = "input-group flatpickr"
    attributes[:data][:wrap] = true
    attributes[:data][:locale] ||= I18n.locale.to_s.split("-").first
    attributes[:data]["alt-input"] ||= true
    attributes[:data]["alt-format"] ||= "Y-m-d"

    attributes
  end

  def localized(time, format)
    time.try(:strftime, convert_to_ruby_format(format)) || time
  end

  def convert_to_ruby_format(picker_format)
    format = picker_format.dup
    format.gsub!("Y", "%Y")
    format.gsub!("y", "%y")
    format.gsub!("m", "%m")
    format.gsub!("d", "%d")

    format.gsub!("H", "%H")
    format.gsub!("h", "%h")
    format.gsub!("i", "%M")
    format.gsub!("S", "%S")
    format
  end
end
