# Todo App #

###Installation

Install all the dependencies using composer

    composer install
    
Copy the example env file and make the required configuration changes in the .env file    

    cp .env.example .env
    
Install the js dependencies using yarn or npm

    yarn install    
        
Install docker containers with sail package

    ./vendor/bin/sail up

Run the database migrations to create the new tables

    ./vendor/bin/sail php artisan migrate          