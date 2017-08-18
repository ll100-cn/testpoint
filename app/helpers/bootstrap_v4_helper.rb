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

  def bootstrap_horizontal_form_for(*args, &block)
    options = {
      wrapper: 'horizontal_form',
      wrapper_mappings: {
        check_boxes: :horizontal_radio_and_checkboxes
      },
      html: { class: "form-horizontal" },
      builder: BootstrapHorizontalBuilder
    }.deep_merge(args.extract_options!)

    options[:defaults] = bootstrap_horizontal_form_defaults.deep_merge(options[:defaults] || {})

    simple_form_for(*args, options, &block)
  end

  def bootstrap_horizontal_form_defaults
    {
      label_html: { class: "col-sm-3 col-lg-2 " },
      content_html: { class: "col-sm-8 col-lg-6" },
      offset_content_html: { class: "ml-auto col-sm-9 col-lg-10" },
      item_wrapper_class: "form-check form-check-inline",
      item_label_class: "form-check-label"
      # hint_wrapper_html:  { class: "col-sm-4" },
      # error_wrapper_html: { class: "col-sm-4" }
    }
  end

  class BootstrapHorizontalBuilder < SimpleForm::FormBuilder
    def actions_content(options = {}, &block)
      input :to_s, { wrapper: :horizontal_offset_content, wrapper_html: { class: "form-actions" } }.merge(options), &block
    end
  end
end
