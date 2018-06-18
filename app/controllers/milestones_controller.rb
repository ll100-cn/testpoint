class MilestonesController < ApplicationController
<<<<<<< 26e97bcced77583c0ffc1a5dc9ce253a43709a5d
  before_action { @navbar = "milestones" }
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @milestones = @milestones.page(params[:page])
  end

  def new
  end

  def create
    @milestone.save
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end

  def show
  end

  def edit
  end

  def update
    @milestone.update(milestone_params)
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end

  def destroy
    @milestone.destroy
    respond_with @milestone, location: ok_url_or_default([@project, Milestone])
  end
protected

  def milestone_params
    params.fetch(:milestone, {}).permit(:title, :start_time, :end_time, :description)
  end
end
