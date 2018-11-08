class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  extend Enumerize
  include SqlScopes

  def self.cleanup_column(*args)
    options = { strip: true, presence: true }.merge(args.extract_options!)
    args.each do |name|
      before_validation if: -> { self.send("#{name}_changed?") } do
        value = self.send(name)
        value = value.try(:strip) if options[:strip]
        value = value.try(:presence) if options[:presence]
        self.send("#{name}=", value)
      end
    end
  end
end
