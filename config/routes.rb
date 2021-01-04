require 'sidekiq/web'
Sidekiq::Web.set :sessions, false

Rails.application.routes.draw do
  devise_for :users, path: "", controllers: {
    sessions: "sessions",
    login_codes: "login_codes"
  }


  devise_scope :user do
    resource :reset_password
  end

  authenticate :user, ->(u) { u.superadmin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  root 'main#root'

  resources :projects do
    scope module: 'projects' do
      resources :test_cases
      resources :plans do
        resources :tasks do
          member do
            get :row
            get :change_state
            get :upload_attachment
            get :related_issues
          end
        end
      end
      resources :issues do
        resources :comments do
          member do
            get :unfold
            get :fold
          end
        end
        resource :subscription
        resources :issue_relationships
      end
      resources :tasks do
        resources :issues
      end
      resources :folders do
        patch :archive, on: :member
      end
      resources :platforms
      resources :labels
      resources :test_case_labels
      resources :milestones
      resources :analytics do
        get :issue_creator_chart, on: :collection
      end
      resources :members
    end
  end

  resources :users
  resources :attachments

  namespace :profiles do
    resource :basic
    resources :projects
  end
end
