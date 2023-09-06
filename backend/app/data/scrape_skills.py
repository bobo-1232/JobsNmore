import requests
import json
import os


session = requests.Session()
session.headers.update(
    {
        "Accept": "application/json",
        "Authorization": "Basic dXRleGFzMToyODkzY3Z1",
    }
)
with open(os.path.join(os.path.dirname(__file__), "occupations.json")) as f:
    occupations = json.load(f)


def scrape_basic_skills():
    skills = []
    with open(os.path.join(os.path.dirname(__file__), "skills.json")) as f:
        base_skills = json.load(f)

    for occupation in occupations:
        onetCode = occupation["onetCode"]

        url = (
            "https://services.onetcenter.org/ws/online/occupations/"
            + onetCode
            + "/details/skills"
        )
        # some onet occupations dont have basic skills I guess
        try:
            response = session.request("GET", url)
            data = response.json()["element"]
        except Exception:
            continue

        for skill in data:
            index = next(
                (
                    index
                    for (index, d) in enumerate(skills)
                    if d["name"] == skill["name"]
                ),
                None,
            )
            if skill["name"] in base_skills:
                if index is None:
                    entry = {
                        "id": skill["id"],
                        "name": skill["name"],
                        "description": skill["description"],
                        "onetcode": [onetCode],
                        "score": [{onetCode: skill["score"]}],
                    }
                    skills.append(entry)
                else:
                    skills[index]["onetcode"].append(onetCode)
                    skills[index]["score"].append({onetCode: skill["score"]})
    final = json.dumps(skills, indent=2)
    with open(os.path.join(os.path.dirname(__file__), "basic_skills.json"), "w") as f:
        f.write(final)

    dskills = []
    for skill in skills:
        for example in skill["score"]:
            onetcode = list(example.keys())[0]
            example[onetcode]["scale"]
            entry = {
                "id": skill["id"],
                "skill_name": skill["name"],
                "description": skill["description"],
                "onetcode": onetcode,
                "score_value": example[onetcode]["value"],
                "importance": example[onetcode]["scale"],
            }
            dskills.append(entry)

    final = json.dumps(dskills, indent=2)

    with open(os.path.join(os.path.dirname(__file__), "dbasic_skills.json"), "w") as f:
        f.write(final)


def scrape_tech_skills():
    skills = []
    for occupation in occupations:
        onetCode = occupation["onetCode"]

        url = (
            "https://services.onetcenter.org/ws/online/occupations/"
            + onetCode
            + "/details/technology_skills"
        )

        response = session.request("GET", url)
        data = response.json()["category"]

        for skill in data:
            index = next(
                (
                    index
                    for (index, d) in enumerate(skills)
                    if d["name"] == skill["title"]["name"]
                ),
                None,
            )

            if index is None:
                entry = {
                    "id": skill["title"]["id"],
                    "name": skill["title"]["name"],
                    "onetcode": [onetCode],
                    "example": [{onetCode: skill["example"]}],
                }
                skills.append(entry)
            else:
                skills[index]["onetcode"].append(onetCode)
                skills[index]["example"].append({onetCode: skill["example"]})

    final = json.dumps(skills, indent=2)

    with open(os.path.join(os.path.dirname(__file__), "tech_skills.json"), "w") as f:
        f.write(final)

    dskills = []
    for skill in skills:
        for example in skill["example"]:
            onetcode = list(example.keys())[0]
            for software in example[str(onetcode)]:
                entry = {
                    "id": skill["id"],
                    "skill_name": skill["name"],
                    "onetcode": onetcode,
                    "name": software["name"],
                }
                if len(software) == 2:
                    entry["hot_technology"] = True
                else:
                    entry["hot_technology"] = False

                dskills.append(entry)

    final = json.dumps(dskills, indent=2)

    with open(os.path.join(os.path.dirname(__file__), "dtech_skills.json"), "w") as f:
        f.write(final)


if __name__ == "__main__":
    scrape_basic_skills()
    scrape_tech_skills()
