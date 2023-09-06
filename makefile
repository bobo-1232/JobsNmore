PROJECT =  wired-plateau-359721
WEBSITE = https://$(PROJECT).uc.r.appspot.com
LOCAL = http://127.0.0.1:5000


models.html: backend/app/models.py
	cd backend && cd app && python -m pydoc -w models

idb3:
	git log > IDB3.log

format-back:
	cd backend && find . -name '*.py' ! -path '*/venv/*' -print0 | xargs -0 black

format-front:
	cd frontend && npx prettier --write .

requirements:
	cd backend && source venv/Scripts/activate && pip-chill --no-version > requirements.txt

backend/venv/Scripts/activate: backend/requirements.txt
	cd backend && python -m venv venv
	cd backend && venv/Scripts/pip install -r requirements.txt

run-back: backend/venv/Scripts/activate
	cd backend && venv/Scripts/python run.py

run-back-test:
	cd backend && source venv/Scripts/activate && pytest app/tests.py -p no:warnings

run-front:
	cd frontend && sed -i 's|$(WEBSITE)|$(LOCAL)|' \
	package.json && npm run start

# Do build test and ensure that the website is running before deploying
build: build-back build-front deploy

build-test: build-back build-front-test run-production

clean-production:
	rm -rf production

# Reduces size of the production folder by only copying necessary files
build-back: clean-production
	mkdir -p production/app/static
	mkdir production//app/routes
	cp backend/app/*.py production/app
	cp backend/app/static/* production/app/static
	cp backend/app/routes/*.py production/app/routes
	cp backend/*.* production
	cd production && sed -i 's|app = create_app()|app = create_app("deploy")|' run.py	

build-back-migrate: clean-production
	mkdir -p production/app/static
	mkdir production//app/routes
	cp backend/app/*.py production/app
	cp -r backend/app/data production/app/
	cp backend/app/static/* production/app/static
	cp backend/app/routes/*.py production/app/routes
	rm -f production/app/data/*.py
	cp backend/*.* production
	cd production && sed -i 's|app = create_app()|app = create_app("deploy_migrate")|' run.py

build-front:
	cd frontend && sed -i 's|$(LOCAL)|$(WEBSITE)|' \
	package.json && npm run build  && mv build ../production

deploy:
	cd production && gcloud app deploy --project $(PROJECT)

build-front-test:
	cd frontend && npm run build && mv build ../production

venv:
	cd production && python -m venv venv && venv/Scripts/pip install -r requirements.txt

run-production: venv
	cd production && venv/Scripts/python run.py

