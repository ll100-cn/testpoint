require_relative "date_picker_input"

class DatetimePickerInput < DatePickerInput

protected
  def wrapper_attributes
    attributes = super
    attributes[:data][:'enable-time'] = true
    attributes["data-time_24hr"] ||= true
    attributes[:data]["alt-format"] = "Y-m-d H:i"
    attributes
  end
end
