require 'rails_helper'

RSpec.describe IssuesController, type: :controller do

  describe "GET #new" do
    let(:task) { create :task }
    action { get :new, params: { task_id: task.id } }
    it { is_expected.to respond_with :success }
  end

end
