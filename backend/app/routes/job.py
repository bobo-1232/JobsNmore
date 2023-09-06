import json
from flask import Flask, Blueprint, request, Response
from app.models import Job
from app.utils import get_query_page
from flask_cors import CORS

jobs_bp = Blueprint("jobs_bp", __name__)
CORS(jobs_bp)

@jobs_bp.route("/api/jobs", methods=["GET"])
def jobs():
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    job_dict = Job.get_jobs(pg, per_page, sort_by, order, search, search_by)

    return Response(json.dumps(job_dict, indent=2), mimetype="application/json")

@jobs_bp.route("/api/jobs/onet/<onetCode>", methods=["GET"])
def get_jobs_by_onet(onetCode):
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    job_dict = Job.get_jobs_by_onet(
        onetCode, pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(job_dict, indent=2), mimetype="application/json")

@jobs_bp.route("/api/jobs/cluster/<cluster>", methods=["GET"])
def get_jobs_by_cluster(cluster):
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    job_dict = Job.get_jobs_by_cluster(
        cluster, pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(job_dict, indent=2), mimetype="application/json")

@jobs_bp.route("/api/jobs/location/<location>", methods=["GET"])
def get_jobs_by_location(location):
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    job_dict = Job.get_jobs_by_location(
        location, pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(job_dict, indent=2), mimetype="application/json")

@jobs_bp.route("/api/jobs/course/<Id>", methods=["GET"])
def get_jobs_by_course(Id):
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    job_dict = Job.get_jobs_by_course(
        Id, pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(job_dict, indent=2), mimetype="application/json")

@jobs_bp.route("/api/jobs/<Id>", methods=["GET"])
def get_job(Id):
    info_dict = Job.get_job_details(Id)

    return Response(json.dumps(info_dict, indent=2), mimetype="application/json")