# Homebank

Hobby project for testing out several frameworks and languages.
 
The aim of the apps are to be able to upload transactions, automatically assign a category when one has already been assigned to a similar transaction and show it in a nice overview.

 ![angular app screenshot](https://github.com/timohermans/Homebank/blob/master/angular/screenshots/angular.png)

## Structure
There are two client side project and two backend projects:

### Clients

- Angular
  - Run it with `yarn start` or `docker-compose up`
- React
  - Run it with `yarn start`
  
### Apis

- Laravel (php)
  - See the combination section for how I run it
  - Architecture: Vertical slice (with Laravel Jobs)
  - Using a proper Domain model (with Doctrine)
- Dotnet Core
  - Run it with 
  - Architecture: Vertical slide (with Mediatr)
  - Using plain (old) Entity Framework core
  
### Full stack combinations

- Angular and Laravel
  - To make it run, clone [devilbox](https://devilbox.readthedocs.io/en/latest/) first
  - Then use the `env` and `docker-compose.override.yml` files in the `angular/.devilbox` folder
  - Navigate to the `devilbox` local repo and run `docker-compose up angular httpd mysql`
  - Happy coding (hot reload works too)
- React and C#
  - Run both project seperately. Haven't tried to make these full stack in one command
  
## Future projects
The next project will be a Django API with a Vue frontend.
