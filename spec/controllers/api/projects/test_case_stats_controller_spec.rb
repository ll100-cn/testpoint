require 'rails_helper'

RSpec.describe Api::Projects::TestCaseStatsController, type: :controller do
  let!(:project) { create :project }
  let!(:test_case_label) { create :test_case_label, project: project }
  let!(:platform) { create :platform, project: project }
  let!(:test_case) { create :test_case, project: project, label_ids: [ test_case_label.id ], platform_ids: [ platform.id ] }

  login_superadmin

  describe "GET index" do
    let!(:attributes) { { project_id: project.id } }
    action { get :index, format: :json, params: attributes }
    it { is_expected.to respond_with :success
         expect(assigns[:test_cases].count).to eq 1 }

    context "with version_at" do
      before { attributes[:version_at] = Date.tomorrow.to_s }

      it { is_expected.to respond_with :success
           expect(assigns[:test_cases].count).to eq 1 }
    end

    context "with q" do
      context "with group_name_cont" do
        before { attributes[:q] = { group_name_cont: test_case.group_name } }

        it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 1 }

        context "with other group_name" do
          before { attributes[:q] = { group_name_cont: "other group name" } }

          it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 0 }
        end
      end

      context "with filter_by_label_id" do
        before { attributes[:q] = { filter_by_label_id: test_case_label.id } }

        it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 1 }

        context "with other label" do
          let!(:other_label) { create :test_case_label, project: project }
          before { attributes[:q] = { filter_by_label_id: other_label.id } }

          it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 0 }
        end
      end

      context "with filter_by_platform_id" do
        before { attributes[:q] = { filter_by_platform_id: platform.id } }

        it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 1 }

        context "with other platform" do
          let!(:other_platform) { create :platform, project: project }
          before { attributes[:q] = { filter_by_platform_id: other_platform.id } }

          it { is_expected.to respond_with :success
             expect(assigns[:test_cases].count).to eq 0 }
        end
      end
    end
  end
end
