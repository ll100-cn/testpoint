class MilestonesController < ApplicationController
  load_and_authorize_resource

  def index
    @milestones = @milestones.page(params[:page])
  end

  def new
  end

  def create
    @milestone.save
    respond_with @milestone, location: ok_url_or_default([Milestone])
  end

  def show
  end

  def edit
  end

  def update
    @milestone.update(milestone_params)
    respond_with @milestone, location: ok_url_or_default([Milestone])
  end

  def destroy
    @milestone.destroy
    respond_with @milestone, location: ok_url_or_default([Milestone])
  end
protected

  def milestone_params
    params.fetch(:milestone, {}).permit(:title, :due_date, :description)
  end
end
