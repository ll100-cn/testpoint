class Projects::TestCasesController < BaseProjectController
  layout 'card-full-height', only: [:index]
  before_action { @navbar = "cases" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource :folder
  load_and_authorize_resource :platform
  load_and_authorize_resource through: :project

  def index
    @default_cases_url_options = request.query_parameters
    @test_cases = @test_cases.available
    @test_cases = @test_cases.where_exists(Platform.connect_test_cases.where(id: @platform)) if @platform
    @test_cases = @test_cases.where(folder_id: @folder.subtree) if @folder
    @test_cases = @test_cases.page(params[:page])

    @folders = @project.folders.available.ranked

    test_cases_counts = @test_cases.group(:folder_id).count
    @folder_test_cases_counts = @folders.each_with_object({}) do |folder, result|
      count = test_cases_counts[folder.id] || 0
      result.merge!(folder.ancestor_ids_with_self.product([count]).to_h) { |key, old, new| old + new }
    end
  end

  def new
  end

  def create
    @test_case.save
    respond_with @test_case, location: ok_url_or_default([@project, TestCase])
  end

  def show
  end

  def edit
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case, action: :edit, location: ok_url_or_default([@project, TestCase])
  end

  def destroy
    @test_case.archive
    respond_with @test_case, location: ok_url_or_default([@project, TestCase])
  end

protected
  def test_case_params
    params.fetch(:test_case, {}).permit(:title, :content, :folder_id, platform_ids: [])
  end
end
