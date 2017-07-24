class ComponentsController < ApplicationController
  load_and_authorize_resource

  def new
    @component.parent_id = params[:parent_id].presence
  end

  def create
    @component.save

    respond_with @component, location: [ ::TestCase, component_id: @component ]
  end

  def edit
  end

  def update
    @component.update(component_params)

    respond_with @component, location: [ ::TestCase, component_id: @component ]
  end

  def destroy
    @component.destroy

    respond_with @component, location: [ ::TestCase, component_id: @component ]
  end

protected

  def component_params
    params.fetch(:component, {}).permit(:title, :parent_id)
  end
end
