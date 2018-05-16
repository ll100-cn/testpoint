class DatetimePickrInput < SimpleForm::Inputs::Base

  def input
    template.content_tag(:div, class: 'input-group datetime-picker', data: { locale: I18n.locale.to_s.split("-").first }) do
      template.concat @builder.text_field(attribute_name, input_html_options)
      template.concat span_calendar
    end
  end

  def input_html_options
    super.deep_merge(data: { input: true })
  end

  def span_calendar
    template.content_tag(:a, class: 'input-group-addon', data: { toggle: true }) do
      template.concat icon_calendar
    end
  end

  def icon_calendar
    "<i class='fa fa-calendar' aria-hidden='true'></i>".html_safe
  end

end