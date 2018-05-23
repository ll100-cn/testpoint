module SimpleForm
  module Components
    module BootstrapV4
      def bootstrap_v4(_wrapper_options = nil)
        input_html_options[:class] ||= []
        input_html_options[:class] << :"is-invalid" if has_errors?
        nil
      end
    end
  end
end
