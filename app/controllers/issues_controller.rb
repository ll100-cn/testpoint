class IssuesController < ApplicationController
  load_and_authorize_resource
  load_and_authorize_resource :task

  before_action :set_tasks

  def new
  end

  def create
    @issue.save
    respond_with @component, location: ok_url_or_default([@task.plan])
  end

protected

  def issue_params
    params.fetch(:issue, {}).permit(:title, :content)
  end

  def set_tasks
    @issue.tasks = [@task]
  end
end
