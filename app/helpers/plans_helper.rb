module PlansHelper
  def task_state_with_icon(text)
    text_sym = text.to_sym
    icons = { pending: "fa fa-circle-o", pass: "fa fa-check", failure: "fa fa-times" }
    class_names = { pending: "text-muted", pass: "text-success", failure: "text-danger" }

    class_name = class_names[text_sym]

    content_tag :span, class: class_name do
      safe_join([
        t(text, :scope => "task.state" ).capitalize,
        content_tag(:span, "", class: icons[text_sym])
      ], ' ')
    end
  end
end