module PlansHelper
  def task_state_with_icon(state)
    text_sym = state.to_sym
    icons = { pending: "far fa-circle", pass: "far fa-check", failure: "far fa-times" }
    text = state.is_a?(String) ? Task.state.find_value(state).text : state.text
    class_names = { pending: "text-muted", pass: "text-success", failure: "text-danger" }

    class_name = class_names[text_sym]

    content_tag :span, class: class_name do
      safe_join([
        text,
        content_tag(:span, "", class: icons[text_sym])
      ], ' ')
    end
  end

end
