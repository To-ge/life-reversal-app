Rails.application.routes.draw do
  get 'messages/index'
  get 'messages/create'
  namespace :api do
    namespace :v1 do
      post 'users/create', to:'users#create'
      get 'users/destroy'
      resources :articles
      resources :cards
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'auth/login', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  # mount ActionCable.server => '/cable'
end
