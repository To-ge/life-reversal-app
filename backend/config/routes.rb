Rails.application.routes.draw do
  get 'messages/index'
  get 'messages/create'
  namespace :api do
    namespace :v1 do
      post 'auth/login', to:'users#create'
      delete 'auth/logout', to:'users#logout'
      get 'users/destroy'
      post 'articles', to:'articles#create'
      resources :cards
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  # mount ActionCable.server => '/cable'
end
