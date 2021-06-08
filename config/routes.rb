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
  resources :issues do
    get :assigned_to_me, on: :collection
  end

  resources :projects do
    patch :subscribe,   on: :member
    patch :unsubscribe, on: :member
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
        member do
          get :edit_project
          patch :update_project
        end
        resources :comments do
          member do
            get :unfold
            get :fold
          end
        end
        resource :subscription
        resources :issue_relationships
        resources :issue_infos
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
        get :issue_activity_chart, on: :collection
      end
      resources :issue_templates
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
