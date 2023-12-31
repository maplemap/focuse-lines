# CS50 Final Project: Focus Lines
#### Video Demo:  https://youtu.be/XHLh8Usc8vs
#### Description:
All we have in life is time, and one of our main tasks is to allocate it properly. Modern life is a multitude of tasks, 
goals, desires and interests, and it is important to understand how much time you have before taking on the next task. 
And maybe it's worth completing the current task first before that? 

Focus Lines is a web application that helps you realize how busy you are or how free you are to take your a next course 
or read a new book.

#### Which technologies were used?
- Docker
- Nginx
- Python (Flask)
- MySQL
- JavaScript (React)
- JWT (JSON Web Token)

#### How to run the project?
1. Clone the repository
2. Add to your hosts file (/etc/hosts) the next line: `127.0.0.1 focus-lines.local`
2. Run `make run` in the root directory

#### Project structure
This project based on Docker. This instrument was chosen because it helps easy to develop, maintain, and deploy to production.
It is divided into the next services:
- `api` - Flask application
- `api-db` - MySQL schema for DB
- `frontend` - React application
- `nginx` - Nginx configuration

Each service contains a `Dockerfile` (except of `nginx`) with the image settings accordingly. There are two `Dockerfile` 
in `frontend` service with two configurations, for development and production.

##### Root:
- `docker-compose.yml` - Docker Compose configuration with details of executing of all services
- `docker-compose.dev.yml` - Docker Compose configuration for development
- `Makefile` - Makefile for running the project

##### API service:
- `app.py` - initialization of Flask application and start of the session
- `db.py` - initialization of DB connection
- `endpoints.py` - all the functionality of the server API endpoints
  - `/token` - creating of authorization JWT token
  - `/get-user` - getting of user data
  - `/registration` - registration of new user
  - `/logout` - logout of user (JWT token is required)
  - `/lines` - working with lines (JWT token is required)
    - `GET` - getting of all lines of user 
    - `POST` - adding of new line
    - `PUT` - updating of line
    - `DELETE` - deleting of line
- `requirements.txt` - Python dependencies

##### API-DB service:
- `schema.sql` - MySQL schemas for creating of DB

##### Frontend service:
- `/` configuration files for React application
- `src/components` - common components
- `src/layouts` - wrappers for pages
- `src/pages` - pages of the application
- `src/routes` - description of routes
- `src/services` - services for working with the server API, authorization, storages, theme, etc.
- `src/ui-kit` - common UI components. Here we can connect some UI libraries and work with them
- `src/utils` - common tools, utils, etc.
