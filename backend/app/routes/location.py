import json
from flask import Flask, Blueprint, request, Response
from app.models import Location
from app.utils import get_query_page
from flask_cors import CORS

locations_bp = Blueprint("locations_bp", __name__)
CORS(locations_bp)


@locations_bp.route("/api/locations", methods=["GET"])
def locations():
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)
    locations_dict = Location.get_locations(
        pg, per_page, sort_by, order, search, search_by
    )

    return Response(
        json.dumps(locations_dict, indent=2), mimetype="application/json"
    )

@locations_bp.route("/api/locations/<Id>", methods=["GET"])
def get_location(Id):
    loc_dict = Location.get_location_details(Id)

    return Response(json.dumps(loc_dict, indent=2), mimetype="application/json")

