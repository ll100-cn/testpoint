class IssuesController < ApplicationController
  load_and_authorize_resource
  load_and_authorize_resource :task

  before_action { @navbar = "Issues" }
  before_action :set_tasks, only: [:new, :create]

  def index
    @issues = @issues.includes(:labels).page(params[:page])
  end

  def new
    @issue.title = @issue.default_title
  end

  def create
    @issue.save
    respond_with @component, location: ok_url_or_default([@task.plan])
  end

  def show
  end

  def edit
  end

  def update
    @issue.update(issue_params)
    respond_with @issue, location: ok_url_or_default([Issue])
  end

protected

  def issue_params
    params.fetch(:issue, {}).permit(:title, :content, :state, label_ids: [])
  end

  def set_tasks
    @issue.tasks = [@task]
  end
end
