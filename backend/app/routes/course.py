import json
from flask import Flask, Blueprint, request, Response
from app.models import Course
from app.utils import get_query_page
from flask_cors import CORS


courses_bp = Blueprint("courses_bp", __name__)
CORS(courses_bp)


@courses_bp.route("/api/courses", methods=["GET"])
def courses():
    pg, per_page, sort_by, order, search, search_by = get_query_page(request.args)

    courses_dict = Course.get_courses(
        pg, per_page, sort_by, order, search, search_by
    )

    return Response(json.dumps(courses_dict, indent=2), mimetype="application/json")

@courses_bp.route("/api/courses/<Id>", methods=["GET"])
def get_course(Id):
    course = Course.get_course(Id)
    return Response(json.dumps(course, indent=2), mimetype="application/json")