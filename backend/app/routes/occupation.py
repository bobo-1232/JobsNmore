import json
from flask import Flask, Blueprint, request, Response
from app.models import Occupation
from app.utils import get_query_page
from flask_cors import CORS

occupations_bp = Blueprint("occupations_bp", __name__)
CORS(occupations_bp)

@occupations_bp.route("/api/occupations", methods=["GET"])
def occupations():
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    occ = Occupation.get_occupations(
        pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(occ, indent=2), mimetype="application/json")

@occupations_bp.route("/api/occupations/<onetCode>", methods=["GET"])
def get_ocupation(onetCode):
    occupation = Occupation.get_occupation(onetCode)

    return Response(json.dumps(occupation, indent=2), mimetype="application/json")