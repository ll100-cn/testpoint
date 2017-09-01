module PlansHelper
  def task_state_with_icon(state)
    result = { text: state, className: "", icon: "" }

    case state
    when "pending"
      result[:className] = "text-muted"
      result[:icon] = "fa fa-circle-o"
    when "pass"
      result[:className] = "text-success"
      result[:icon] = "fa fa-check"
    when "failure"
      result[:className] = "text-danger"
      result[:icon] = "fa fa-times"
    end

    content_tag :span, class: result[:className] do
      "#{result[:text].capitalize} <span class='#{result[:icon]}'></span>".html_safe
    end
  end
end
