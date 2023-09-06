import json
from flask import Flask, Response, request, send_file, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from app.create_db import (
    db,
    Location,
    Occupation,
    Job,
    Course,
    Industry,
    create_locations,
    create_jobs,
    create_courses,
    create_occupations,
    create_industries,
)




# Application factory, use run.py to create an instance of the app
def create_app(config=None):
    if config == "deploy" or config == "deploy_migrate":
        app = Flask(__name__, static_folder="../build", static_url_path="")
    else:
        app = Flask(__name__)

    CORS(app, supports_credentials=True)

    # Make sure your log info matches up with this line. You can change this line for you local machine
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DB_STRING", "postgresql://postgres:Passkey123@localhost:5432/jobdb"
    )
    # to suppress a warning message
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
    app.config["JSON_SORT_KEYS"] = False

    db.init_app(app)

    with app.app_context():
        """ 
            initialize_db is for local reset of DB
            deploy_migrate is for GCP reset of DB
            
        """
        if config == "initialize_db" or config == "deploy_migrate":
            db.drop_all()
            db.create_all()
            create_locations()
            create_industries()
            create_occupations()
            create_jobs()
            create_courses()

    from app.gitlab import get_commits, get_issues
    from app.routes import job, location, occupation, course, cluster

    # Serve React SPA from Flask when running in production
    @app.route("/")
    def serve():
        return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    @app.route("/api/about")
    def about():
        commits = get_commits()
        issues = get_issues()
        return Response(
            json.dumps([commits, issues], indent=2), mimetype="application/json"
        )

    @app.route("/api/test")
    def test():
        return send_file("static/tests.txt")

    @app.route("/api/about.json")
    def about_json():
        return send_file("static/about.json")

    @app.route("/test_request")
    def get_test():
        location = db.session.query(Location).first()
        return location.City

    @app.route("/api/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            return "Form submitted"


    # Model routes
    app.register_blueprint(job.jobs_bp)
    app.register_blueprint(cluster.clusters_bp)
    app.register_blueprint(location.locations_bp)
    app.register_blueprint(course.courses_bp)
    app.register_blueprint(occupation.occupations_bp)
    
    return app
