Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'pages#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end
  match '/', to: 'pages#home', via: [:get]
  match '/about', to: 'pages#about', via: [:get]
  match '/contact', to: 'pages#contact', via: [:get]
  match '/product', to: 'pages#product', via: [:get]
  match '/solutions', to: 'pages#solutions', via: [:get]
  match '/solutions/energy', to: 'pages#senergy', via: [:get]
  match '/solutions/finance', to: 'pages#sfinance', via: [:get]
  match '/predict/energy', to: 'pages#penergy', via: [:get]
  match '/predict/finance', to: 'pages#pfinance', via: [:get]
  match '/home', to: 'pages#home', via: [:get]

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
