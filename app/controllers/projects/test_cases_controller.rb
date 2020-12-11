class Projects::TestCasesController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :folder
  load_and_authorize_resource :platform
  load_and_authorize_resource :test_case_label
  load_and_authorize_resource through: :project

  def index
    @default_cases_url_options = request.query_parameters
    @q = @test_cases.available.ransack(params[:q])
    test_cases_scope = @q.result
    test_cases_scope = test_cases_scope.where_exists(Platform.connect_test_cases.where(id: @platform)) if @platform
    test_cases_counts = test_cases_scope.group(:folder_id).count

    @test_cases = test_cases_scope
    @test_cases = @test_cases.where(folder_id: @folder.subtree) if @folder

    @folders = @project.folders.ranked
    @folder_test_cases_counts = Folder.descendants_with_self_counts(@folders, test_cases_counts)
  end

  def new
  end

  def show
  end

  def edit
  end

  def create
    @test_case.save
    respond_with @test_case, location: -> { ok_url_or_default([@project, TestCase]) }
  end

  def show
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case, location: -> { ok_url_or_default([@project, TestCase]) }
  end

  def destroy
    @test_case.archive
    respond_with @test_case, location: -> { ok_url_or_default([@project, TestCase]) }
  end

protected
  def test_case_params
    params.fetch(:test_case, {}).permit(:title, :content, :folder_id, platform_ids: [], label_ids: [])
  end
end
