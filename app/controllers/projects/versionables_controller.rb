class Projects::VersionablesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :test_case, through: :project
  load_and_authorize_resource through: :test_case

  def new
    @versionable.history_id = params[:history_id]
    @versionable.category = params[:category]
  end

  def create
    @versionable.save
    respond_with @versionable, location: ok_url_or_default([@project, @test_case])
  end

  def edit
  end

  def update
    @versionable.update(versionable_params)
    respond_with @versionable, location: ok_url_or_default([@project, @test_case])
  end

  def destroy
    @versionable.destroy
    respond_with @versionable, location: ok_url_or_default([@project, TestCase])
  end

protected
  def versionable_params
    params.fetch(:versionable, {}).permit(:test_case_version_id, :category, :history_id)
  end
end