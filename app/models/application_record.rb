require 'fume/require_accessor'

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  extend Enumerize
  include SqlScopes
  include Fume::RequireAccessor
  include AnyOfConds
  include Ransackable

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

  def self.cond_any_of(conds)
    klass = relation.klass
    items = conds.map do |statements|
      statements.reduce(klass) do |base, (name, value)|
        if klass.ransackable_scopes(nil).include?(name)
          base.send(name, value)
        else
          base.where(name => value)
        end
      end
    end

    self.where_any_of(*items)
  end

  def self.cond_match?(statements, data)
    statements.all? do |(name, scope_value)|
      data_value = data[name.to_sym]
      if scope_value.is_a?(Array)
        data_value == scope_value || scope_value.include?(data_value)
      else
        data_value == scope_value
      end
    end
  end
end
