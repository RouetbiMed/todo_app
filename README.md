# Todo App #

###Installation

Install all the dependencies using composer

    composer install
    
Copy the example env file and make the required configuration changes in the .env file    

    cp .env.example .env
    
Install the js dependencies using yarn or npm

    yarn install    
    
Run this command to compile js & css files

    yarn run dev        
        
Install docker containers with sail package

    ./vendor/bin/sail up

Run the database migrations to create the new tables

    ./vendor/bin/sail php artisan migrate    
    
Once the application's containers have been started, you may access the project in your web browser at: http://localhost.  