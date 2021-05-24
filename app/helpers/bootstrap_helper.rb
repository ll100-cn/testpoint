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
        boolean:       :vertical_boolean,
        check_boxes:   :vertical_collection_inline
      },
      html: { class: "form-vertical" },
      builder: BootstrapVerticalBuilder
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
      label_html: { class: "col-sm-2 text-right" },
    }
  end

  def bootstrap_inline_form_for(*args, &block)
    options = args.extract_options!
    apply_bootstrap_inline_form_options!(options)
    simple_form_for(*args, options, &block)
  end

  def apply_bootstrap_inline_form_options!(options = {})
    options.deep_merge!(
      {
        wrapper: 'inline_form',
        wrapper_mappings: {
          boolean:       :inline_boolean,
          check_boxes:   :inline_collection_inline
        },
        html: { class: "row mb-3" },
        builder: BootstrapVerticalBuilder
      }.deep_merge(options)
    )
    options[:defaults] = bootstrap_inline_form_defaults.deep_merge(options[:defaults] || {})
    options
  end

  def bootstrap_inline_form_defaults
    {
      wrapper_html: { class: "" },
      label_html: { class: "" },
      legend_tag_html: { class: "" }
    }
  end

  class BootstrapHorizontalBuilder < SimpleForm::FormBuilder
    def actions_content(options = {}, &block)
      input :to_s, { label: false, wrapper_html: { class: "form-actions" } }.merge(options), &block
    end
  end

  class BootstrapVerticalBuilder < SimpleForm::FormBuilder
    def input(attribute_name, options = {}, &block)
      if (permit_for = self.options[:permit_for])
        unless options.key?(:disabled)
          options[:disabled] = permit_for.none? do |item|
            item.is_a?(Hash) ? item.key?(attribute_name) : item == attribute_name
          end
        end
      end

      super(attribute_name, options, &block)
    end
  end

  class BootstrapInlineBuilder < SimpleForm::FormBuilder
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
