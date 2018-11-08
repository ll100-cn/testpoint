module CleanupColumn
  extend ActiveSupport::Concern

  def normalize_space(text)
    return if text.nil?

    text.tr("\u2003", " ") # EM Space => Space
  end

  module ClassMethods
    def cleanup_column(*args)
      options = { strip: true, presence: true, normalize: true }.merge(args.extract_options!)
      args.each do |name|
        before_validation if: -> { self.send("will_save_change_to_#{name}?") } do
          value = self.send(name)
          value = value.try(:strip) if options[:strip]
          value = value.try(:presence) if options[:presence]
          value = normalize_space(value) if options[:normalize]
          self.send("#{name}=", value)
        end
      end
    end
  end
end
