class PlansController < ApplicationController
  load_and_authorize_resource

  def index
    @plans = @plans.page(params[:page])
  end

  def new
    @plan.title = "Test Plan: #{Date.current}"
  end

  def create
    @plan.save

    respond_with @plan
  end

  def edit
  end

  def update
    @plan.update(plan_params)

    respond_with @plan
  end

  protected

  def plan_params
    params.fetch(:plan, {}).permit(:title)
  end
end
