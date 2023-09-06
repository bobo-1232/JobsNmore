import requests
import json
from concurrent.futures import ThreadPoolExecutor

# retrieves all jobs and their details for each cluster - not used
# def get_jobs_per_cluster():
#     clustersCodes = ["4.0000", "6.0000", "8.0000", "11.0000", "15.0000"]
#     all_jobs = {}
#     session = requests.Session()
#     session.headers.update(
#         {
#             "Accept": "application/json",
#             "Authorization": "Basic dXRleGFzMToyODkzY3Z1",
#         }
#     )
#     for code in clustersCodes:
#         url = (
#             "https://services.onetcenter.org/ws/online/career_clusters/"
#             + code
#             + "?start=0&end=200"
#         )

#         response = session.request("GET", url)
#         data = response.json()["occupation"]
#         codes = [get_code_details(onet_code["code"]) for onet_code in data]
#         sort = sorted(codes, key=lambda x: x["curr_employment"], reverse=True)
#         all_jobs[code] = sort

#     final = json.dumps(all_jobs, indent=2)
#     with open("all_jobs.json", "w") as f:
#         f.write(final)


def get_top_jobs(cluster_codes):
    jobs = []
    cluster, codes = cluster_codes
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
        }
    )

    jobs.extend(
        list(
            map(
                get_code_details, ((onet_code, cluster, session) for onet_code in codes)
            )
        )
    )
    return jobs


def get_code_details(info):
    onet_code, cluster, session = info
    url = (
        "https://api.careeronestop.org/v1/occupation/1cgBjWAkajxAu5r/"
        + onet_code
        + "/0?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false"
    )
    with session.get(url) as response:
        data = response.json()
        wages = data["OccupationDetail"][0]["Wages"]["NationalWagesList"]
        median_wage = [
            wage["Median"] for wage in wages if wage["RateType"] == "Annual"
        ][0]
        pct90_wage = [wage["Pct90"] for wage in wages if wage["RateType"] == "Annual"][
            0
        ]
        outlook = data["OccupationDetail"][0]["BrightOutlook"]
        outlook_category = data["OccupationDetail"][0]["BrightOutlookCategory"]

        title = data["OccupationDetail"][0]["OnetTitle"]
        description = data["OccupationDetail"][0]["OnetDescription"]

        projections = data["OccupationDetail"][0]["Projections"]["Projections"][0]
        proj_openings = projections["ProjectedAnnualJobOpening"]
        percent_change = projections["PerCentChange"]
        curr_employment = projections["EstimatedEmployment"]
        total_employed = int("".join(curr_employment.split(",")))
        bls = data["OccupationDetail"][0]["OOHs"]["OOHUrl"]
        entry = {
            "onetCode": onet_code,
            "cluster": cluster,
            "title": title,
            "description": description,
            "median_wage": median_wage,
            "pct90_wage": pct90_wage,
            "outlook": outlook,
            "outlook_category": outlook_category,
            "curr_employment": total_employed,
            "proj_openings": proj_openings,
            "percent_change": percent_change,
            "bls": bls,
        }
        return entry


def main():
    jobs = []
    with open("top_6_occupations.json") as f:
        data = json.load(f)
    with ThreadPoolExecutor(max_workers=5) as executor:
        for job_list in executor.map(
            get_top_jobs, ((cluster, code) for (cluster, code) in data.items())
        ):
            jobs.extend(job_list)
    final = json.dumps(jobs, indent=2)
    with open("occupations.json", "w") as f:
        f.write(final)


if __name__ == "__main__":
    main()
