Rails.application.routes.draw do
  devise_for :users, path: ""
  root 'main#root'

  resources :test_cases
  resources :plans do
    resources :tasks
  end
  resources :components
end
