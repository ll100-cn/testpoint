class TestCasesController < ApplicationController
  layout "cases"
  load_and_authorize_resource :component
  load_and_authorize_resource :platform
  load_and_authorize_resource

  def index
    @default_cases_url_options = request.query_parameters
    @test_cases = @test_cases.where(component_id: @component.subtree) if @component
    @test_cases = @test_cases.where_exists(Platform.connect_test_cases.where(id: @platform)) if @platform
    @test_cases = @test_cases.joins(:platforms).includes(:platforms).page(params[:page])
  end

  def new
  end

  def create
    @test_case.save
    respond_with @test_case, location: ok_url_or_default([TestCase])
  end

  def show
  end

  def edit
  end

  def update
    @test_case.update(test_case_params)
    respond_with @test_case, location: ok_url_or_default([TestCase])
  end

protected

  def test_case_params
    params.fetch(:test_case, {}).permit(:title, :content, :component_id, platform_ids: [])
  end
end
