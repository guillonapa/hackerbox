#!make
# prefix for info messages
ECHO_PREFIX := 🔧

# heroku deployment
# heroku-login:
# 	heroku login
# 	heroku container:login

# heroku-deploy:
# 	heroku container:push web --app $(HEROKU_APP_NAME)
# 	heroku container:release web --app $(HEROKU_APP_NAME)

# heroku-logs:
# 	heroku logs --tail --app $(HEROKU_APP_NAME)

# heroku-db-create:
# 	heroku pg:psql --app $(HEROKU_APP_NAME) < backend/db/schema.sql

# installs dependencies
init:
	@echo "$(ECHO_PREFIX) Installing dependencies..."
	npm install

# removes installed dependencies
clean:
	@echo "$(ECHO_PREFIX) Cleaning project..."
	rm -rf node_modules

# starts the postgresql service
db-start:
	@echo "$(ECHO_PREFIX) Starting database service..."
	pg_ctl -D /usr/local/var/postgres start

# stops the postgresql service
db-stop:
	@echo "$(ECHO_PREFIX) Stopping database service..."
	pg_ctl -D /usr/local/var/postgres stop

# creates the db with the defined tables
db-create:
	@echo "$(ECHO_PREFIX) Creating new database 'hackerbox-sandbox'..."
	psql postgres < localbox/schema.sql

# starts the backend locally
local-backend: 
	@echo "$(ECHO_PREFIX) Starting backend service..."
	npm run start-localbox

# starts the frontend locally
local-frontend:
	@echo "$(ECHO_PREFIX) Starting frontend service..."
	npm run start-frontend

# run app in local container
docker-start:
	@echo "$(ECHO_PREFIX) Starting Docker container..."
	docker-compose up

# stops the app's container
docker-stop:
	@echo "$(ECHO_PREFIX) Stopping Docker container..."
	docker-compose stop
	@echo "$(ECHO_PREFIX) Removing Docker container..."
	docker-compose rm -f

# removes the docker image
docker-clean: docker-stop
	@echo "$(ECHO_PREFIX) Removing Docker image..."
	docker-compose down --rmi all

# build the docker image again
docker-build: docker-stop
	@echo "$(ECHO_PREFIX) Building Docker image..."
	docker-compose build
