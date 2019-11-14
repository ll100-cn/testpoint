class Projects::FoldersController < BaseProjectController
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  def new
    @folder.parent_id = params[:parent_id].presence
  end

  def create
    @folder.save
    respond_with @folder, location: ok_url_or_default([@project, TestCase])
  end

  def edit
  end

  def update
    @folder.update(folder_params)
    respond_with @folder, location: ok_url_or_default([@project, TestCase])
  end

  def destroy
    @folder.archive
    respond_with @folder, location: ok_url_or_default([@project, TestCase])
  end

protected
  def folder_params
    params.fetch(:folder, {}).permit(:name, :parent_id)
  end
end
