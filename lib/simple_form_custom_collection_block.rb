module SimpleFormCustomCollectionBlock
  class CustomCollectionLabelBuilder < SimpleDelegator
    attr_accessor :label_block

    def text(*)
      label_block.call(self)
    end
  end

  def collection_block_for_nested_boolean_style
    if (custom_collection_label_block = options[:custom_collection_label_block])
      proc do |builder|
        custom_builder = CustomCollectionLabelBuilder.new(builder)
        custom_builder.label_block = custom_collection_label_block
        build_nested_boolean_style_item_tag(custom_builder)
      end
    else
      super
    end
  end
end
