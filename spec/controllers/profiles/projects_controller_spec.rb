require 'rails_helper'

RSpec.describe Profiles::ProjectsController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

  describe "GET show" do
    action { get :show, params: { id: project.id } }

    it { is_expected.to respond_with :success }
  end

  describe "PUT update" do
    action { put :update, params: { id: project.id, member: { nickname: "hello" } } }

    it { expect(assigns[:member].nickname).to eq "hello" }
  end
end
