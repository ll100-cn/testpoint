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
    collection do
      get :my
      get :assigned
      get :archived
    end
  end

  resources :projects do
    patch :subscribe,   on: :member
    patch :unsubscribe, on: :member
    patch :archive, on: :member
    scope module: 'projects' do
      resources :test_cases
      resources :plans do
        resources :phases
        resources :tasks do
          member do
            get :row
            get :change_state
            get :upload_attachment
            get :related_issues
            patch :update_upshot
          end

          resources :upshots do
            member do
              get :row
              patch :state
              patch :content
              patch :archive_issue
            end
          end
        end
        resources :upshots
      end
      resources :issues do
        member do
          get :edit_project
          patch :update_project
          post :archive
          match :unresolve, via: [ :get, :patch ]
        end
        resources :comments do
          member do
            get :comment
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
      resources :categories
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
