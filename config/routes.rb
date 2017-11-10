Rails.application.routes.draw do
  devise_for :users, path: ""
  root 'main#root'

  resources :test_cases
  resources :plans do
    resources :tasks do
      get :change_state, on: :member
    end
  end
  resources :issues
  resources :tasks do
    resources :issues
  end
  resources :components
  resources :platforms
  resources :attachments
end
