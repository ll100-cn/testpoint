class DatetimePickrInput < SimpleForm::Inputs::Base

  def input(wrapper_options)
    template.content_tag(:div, class: 'input-group datetime-picker', data: { locale: I18n.locale.to_s.split("-").first }) do
      template.concat @builder.text_field(attribute_name, input_html_options)
      template.concat calendar_icon
    end
  end

  def input_html_options
    super.deep_merge(data: { input: true }, class: 'form-control')
  end

  def calendar_icon
    template.content_tag(:div, class: 'input-group-append') do
      template.content_tag(:a, class: 'input-group-text', data: { toggle: true }) do
        template.concat icon_calendar
      end
    end
  end

  def icon_calendar
    "<i class='fa fa-calendar' aria-hidden='true'></i>".html_safe
  end

end