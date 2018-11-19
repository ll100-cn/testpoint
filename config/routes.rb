Rails.application.routes.draw do
  devise_for :users, path: "", controllers: {
    sessions: "sessions"
  }, skip: [ :confirmations, :passwords ]


  devise_scope :user do
    resource :reset_password
  end

  root 'main#root'

  resources :projects do
    scope module: 'projects' do
      resources :test_cases
      resources :plans do
        resources :tasks do
          member do
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
      end
      resources :tasks do
        resources :issues
      end
      resources :components
      resources :platforms
      resources :labels
      resources :milestones
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
