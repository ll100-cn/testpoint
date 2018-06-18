class ProjectsController < ApplicationController
  before_action { @navbar = "project" }
  load_and_authorize_resource

  layout "project", only: [:index, :new, :edit]

  def index
    @projects = @projects.page(params[:page])
  end

  def new
  end

  def create
    @project.save
    respond_with @project, location: ok_url_or_default([Project])
  end

  def edit
  end

  def update
    @project.update(project_params)
    respond_with @project, location: ok_url_or_default([Project])
  end

  def show
    @test_cases = @project.test_cases
    @plans = @project.plans
    @issues = @project.issues
    @components = @project.components
    @platforms = @project.platforms
  end

  def destroy
    @project.destroy
    respond_with @project, location: ok_url_or_default([Project])
  end

protected

  def project_params
    params.fetch(:project, {}).permit(:name)
  end
end
