require 'sidekiq/web'
Sidekiq::Web.set :sessions, false

Rails.application.routes.draw do
  devise_for :users, path: "", controllers: {
    sessions: "sessions",
    login_codes: "login_codes"
  }


  # devise_scope :user do
  #   resource :reset_password
  # end

  authenticate :user, ->(u) { u.superadmin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  # root 'main#root'
  # get '/dashboard', to: 'main#dashboard'

  # resources :issues do
  #   collection do
  #     get :dashboard
  #     get :created
  #     get :focused
  #     get :assigned
  #     get :archived
  #   end
  # end

  # resources :projects do
  #   patch :subscribe,   on: :member
  #   patch :unsubscribe, on: :member
  #   patch :archive, on: :member
  #   scope module: 'projects' do
  #     resources :test_cases
  #     resources :test_case_snapshots
  #     resources :plans do
  #       resources :phases
  #       resources :tasks do
  #         member do
  #           get :row
  #           get :change_state
  #           get :upload_attachment
  #           get :related_issues
  #           patch :update_upshot
  #         end

  #         resources :upshots do
  #           member do
  #             get :row
  #             patch :state
  #             patch :content
  #             patch :archive_issue
  #           end
  #         end
  #       end
  #       resources :upshots
  #     end
  #     resources :issues do
  #       member do
  #         get :edit_project
  #         patch :update_project
  #         post :archive
  #         match :unresolve, via: [ :get, :patch ]
  #       end
  #       resources :comments do
  #         member do
  #           get :comment
  #           get :unfold
  #           get :fold
  #         end
  #       end
  #       resource :subscription
  #       resources :issue_relationships
  #       resources :issue_infos
  #     end
  #     resources :tasks do
  #       resources :issues
  #     end
  #     resources :folders do
  #       patch :archive, on: :member
  #     end
  #     resources :platforms
  #     resources :categories
  #     resources :test_case_labels
  #     resources :test_case_snapshots
  #     resources :analytics do
  #       get :issue_creator_chart, on: :collection
  #       get :issue_activity_chart, on: :collection
  #     end
  #     resources :issue_templates
  #     resources :members
  #   end

  #   get "milestones(/*path)", as: :milestones, action: "vue", on: :member
  #   get "plans(/*path)", as: :plans, action: "vue", on: :member
  #   get "error(/*path)", action: "vue", on: :member
  # end

  # resources :users
  # resources :attachments

  # namespace :profiles do
  #   resource :basic
  #   resources :projects
  # end

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :attachments

    resources :projects do
      scope module: 'projects' do
        resources :members do
          get "list", on: :collection
          patch :archive, on: :member
        end
        resources :categories
        resources :category_infos
        resources :test_case_stats
        resources :test_cases do
          get :history, on: :member
        end
        resources :platforms
        resources :test_case_labels
        resources :test_case_label_infos

        resources :plans do
          resources :phases do
            resources :task_upshot_infos
          end
          resources :phase_infos
          resources :tasks do
            member do
              patch :ignore
              patch :unignore
            end

            resources :upshots do
              member do
                patch :state
                patch :content
              end
            end
          end

          resources :task_infos
        end

        resources :milestones do
          patch :archive, on: :member
        end

        resources :issue_templates
        resources :issues do
          resource :subscription
          resources :issue_relationships
          resources :issue_surveys
          resources :issue_actions

          get :summary, on: :collection
          patch :unresolve, on: :member
          patch :archive, on: :member
          patch :migrate, on: :member
          get :activities, on: :member
          get :source_relationships, on: :member
          get :target_relationships, on: :member
          get :attachments, on: :member

          resources :comments do
            member do
              get :comment
            end
          end
        end
        resources :issue_stats
        resources :issue_infos
        resources :issue_summaries
      end
    end

    namespace :profile do
      root to: "main#root"
      resources :issues
      resources :issue_stats

      resource :basic
      resources :member_infos
    end

    devise_scope :user do
      post :deliver, to: "sessions#deliver"
      post :sign_in, to: "sessions#create"
      delete :sign_out, to: "sessions#destroy"
    end

    namespace :admin do
      resources :users
      resources :projects
    end
  end

  root to: "main#vue"
  get "*path" => "main#vue"
end
