module BootstrapHelper
  def bootstrap_vertical_form_for(*args, &block)
    args = bootstrap_args_for_vertical(*args)
    simple_form_for(*args, &block)
  end

  def bootstrap_args_for_vertical(*args)
    options = {
      defaults: { boolean_label_class: "form-check-label" },
      wrapper: :vertical_form,
      wrapper_mappings: {
        boolean: :vertical_boolean
      },
      html: { class: "form-vertical" }
    }.deep_merge(args.extract_options!)

    args + [ options ]
  end

  def bootstrap_horizontal_form_for(*args, &block)
    options = {
      wrapper: 'horizontal_form',
      wrapper_mappings: {
        boolean:       :horizontal_boolean,
        check_boxes:   :horizontal_collection_inline,
        date:          :horizontal_multi_select,
        datetime:      :horizontal_multi_select,
        file:          :horizontal_file,
        radio_buttons: :horizontal_collection_inline,
        range:         :horizontal_range,
        time:          :horizontal_multi_select
      },
      html: { class: "form-horizontal" },
      builder: BootstrapHorizontalBuilder
    }.deep_merge(args.extract_options!)

    options[:defaults] = bootstrap_horizontal_form_defaults.deep_merge(options[:defaults] || {})

    simple_form_for(*args, options, &block)
  end

  def bootstrap_horizontal_form_defaults
    {
      legend_tag_html: { class: "col-sm-2 text-right" },
      label_wrapper_html: { class: "col-sm-2 text-right" },
      grid_wrapper_html: { class: "col" }
    }
  end

  def bootstrap_inline_form_for(*args, &block)
    options = args.extract_options!
    apply_bootstrap_inline_form_options!(options)
    simple_form_for(*args, options, &block)
  end

  def apply_bootstrap_inline_form_options!(options)
    options.deep_merge!(
      {
        wrapper: 'inline_form',
        wrapper_mappings: {
          boolean: :inline_boolean
        },
        html: { class: "form-inline" }
      }.deep_merge(options)
    )
    options[:defaults] = bootstrap_inline_form_defaults.deep_merge(options[:defaults] || {})
  end

  def bootstrap_inline_form_defaults
    {
      wrapper_html: { class: "mb-2 mr-sm-3" },
      label_html: { class: "sr-only" }
    }
  end

  class BootstrapHorizontalBuilder < SimpleForm::FormBuilder
    def actions_content(options = {}, &block)
      input :to_s, { label: false, wrapper_html: { class: "form-actions" } }.merge(options), &block
    end
  end

  def bootstrap_flash_class_for(type)
    case type.to_s
    when "notice"
      "success"
    when "alert"
      "danger"
    else
      type.to_s
    end
  end
end
