require "simple_form"

class RansackSimpleFormBuilder < SimpleForm::FormBuilder

  # def input(attribute_name, options = {}, &block)
  #   options[:label] ||= object.translate(attribute_name)
  #   super
  # end

  alias attribute input

end
