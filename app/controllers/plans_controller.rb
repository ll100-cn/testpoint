class PlansController < ApplicationController
  before_action { @navbar = "plans" }
  load_and_authorize_resource

  def index
    @plans = @plans.page(params[:page])
    @tasks_count_mapping = Task.joins(:plan).merge(@plans)
                               .select(:plan_id, :state, "count(1) AS count")
                               .group(:plan_id, :state)
                               .each_with_object({}) do |task, result|
      result[task.plan_id] ||= {}
      result[task.plan_id][task.state] = task.count
    end
  end

  def new
    @plan.title = "Test Plan: #{Date.current}"
  end

  def create
    @plan.generate(test_case_ids: TestCase.ids)
    respond_with @plan, location: ok_url_or_default([Plan])
  end

  def edit
  end

  def update
    @plan.update(plan_params)
    respond_with @plan, location: ok_url_or_default([Plan])
  end

protected

  def plan_params
    params.fetch(:plan, {}).permit(:title)
  end
end
