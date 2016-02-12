# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( icon.png )
Rails.application.config.assets.precompile += %w( logo.png )
Rails.application.config.assets.precompile += %w( blurredMap.png )

Rails.application.config.assets.precompile += %w( jquery.js )
Rails.application.config.assets.precompile += %w( bootstrap.min.js )

Rails.application.config.assets.precompile += %w( http://maps.googleapis.com/maps/api/js )

Rails.application.config.assets.precompile += %w( bootstrap.css )
Rails.application.config.assets.precompile += %w( normalize.css )
Rails.application.config.assets.precompile += %w( style.css )
Rails.application.config.assets.precompile += %w( http://fonts.googleapis.com/css?family=Open+Sans.css )
Rails.application.config.assets.precompile += %w( https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css )
