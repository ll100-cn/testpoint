class DatetimePickrInput < SimpleForm::Inputs::Base

  def input
    template.content_tag(:div, class: 'input-group datetime-picker', data: { locale: I18n.locale.to_s.split("-").first }) do
      template.concat @builder.text_field(attribute_name, input_html_options)
      template.concat append
    end
  end

  def input_html_options
    # super.deep_merge(data: { input: true }, style: 'border: 1px solid #c3c3c3;border-radius: 3px;')
    super.deep_merge(data: { input: true }, class:'form-control' )
  end

  def append
    template.content_tag(:div, class: 'input-group-append') do
      template.concat calendar
    end
  end

  def calendar
    template.content_tag(:a, class: 'input-group-text', data: { toggle: true }) do
      template.concat icon_calendar
    end
  end

  def icon_calendar
    "<i class='fa fa-calendar' aria-hidden='true'></i>".html_safe
  end

end