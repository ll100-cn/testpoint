module AllowGraphAddons
  extend ActiveSupport::Concern

  included do
    helper_method :with_graph
    helper_method :resource_graph
    helper_method :resource_graph_columns
  end

  def resource_graph
    return @resource_graph if defined?(@resource_graph)
    @resource_graph = request.headers["HTTP_X_RESOURCE_GRAPH"].presence&.to_sym
  end

  def resource_graph_columns
    return @resource_graph_columns if defined?(@resource_graph_columns)
    @resource_graph_columns = resource_graph.to_s.split(",").map(&:strip)
  end

  def with_graph(name)
    resource_graph ?  "#{name}_#{resource_graph}" : name
  end

  def set_resource_graph
    request.variant = resource_graph if resource_graph
  end

  class_methods do
    def allow_graph(*graphs)
      before_action {
        raise AbstractController::ActionNotFound if resource_graph && graphs.exclude?(resource_graph)
      }
    end
  end
end
