import json
from flask import Flask, Blueprint, request, Response
from app.models import Industry
from app.utils import get_query_page
from flask_cors import CORS

clusters_bp = Blueprint("clusters_bp", __name__)
CORS(clusters_bp)

@clusters_bp.route("/api/clusters", methods=["GET"])
def career_cluster():
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    clusters = Industry.get_clusters(sort_by, order, search, search_by)

    return Response(json.dumps(clusters, indent=2), mimetype="application/json")

@clusters_bp.route("/api/clusters/<code>", methods=["GET"])
def get_cluster(code):

    cluster_dict = Industry.get_cluster(code)

    return Response(json.dumps(cluster_dict, indent=2), mimetype="application/json")