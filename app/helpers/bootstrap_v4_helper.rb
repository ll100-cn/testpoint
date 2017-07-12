module BootstrapV4Helper
  def bootstrap_vertical_form_for(*args, &block)
    options = {
      defaults: { boolean_label_class: "form-check-label" },
      wrapper: :vertical_form,
      wrapper_mappings: {
        boolean: :vertical_boolean
      },
      html: { class: "form-vertical" },
    }.deep_merge(args.extract_options!)

    simple_form_for(*args, options, &block)
  end
end
