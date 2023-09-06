import requests
import json
import os
from concurrent.futures import ThreadPoolExecutor

cities = [
    ("New York, NY", 1),
    ("Los Angeles, CA", 2),
    ("Chicago, IL", 3),
    ("Houston, TX", 4),
    ("Phoenix, AZ", 5),
    ("Philadelphia, PA", 6),
    ("San Antonio, TX", 7),
    ("San Diego, CA", 8),
    ("Dallas, TX", 9),
    ("San Jose, CA", 10),
    ("Austin, TX", 11),
    ("Jacksonville, FL", 12),
    ("Fort Worth, TX", 13),
    ("Columbus, OH", 14),
    ("Indianapolis, IN", 15),
    ("Charlotte, NC", 16),
    ("San Francisco, CA", 17),
    ("Seattle, WA", 18),
    ("Denver, CO", 19),
    ("Oklahoma City, OK", 20),
    ("Nashville, TN", 21),
    ("El Paso, TX", 22),
    ("Washington, DC", 23),
    ("Boston, MA", 24),
    ("Las Vegas, NV", 25),
    ("Portland, OR", 26),
    ("Detroit, MI", 27),
    ("Louisville, KY", 28),
    ("Memphis, TN", 29),
    ("Baltimore, MD", 30),
]


with open("occupations.json") as f:
    occupations = json.load(f)


def get_jobs(cities):
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
        }
    )

    for city in cities:
        currentCity = []
        script_dir = os.path.dirname(__file__)
        file_path = os.path.join(script_dir, "jobsByCity/" + city[0] + "Jobs.json")

        for occupation in occupations:
            onetCode = occupation["onetCode"]
            url = (
                "https://api.careeronestop.org/v1/jobsearch/1cgBjWAkajxAu5r/"
                + onetCode
                + "/"
                + city[0]
                + "/25/date/0/0/25/40"
            )
            with session.get(url) as response:
                jobs = response.json()["Jobs"]
                jobPostings = list(
                    map(get_job_details, ((job, onetCode, city) for job in jobs))
                )
                currentCity.extend(jobPostings)

        final = json.dumps(currentCity, indent=2)
        with open(file_path, "w") as outfile:
            outfile.write(final)


def get_job_details(info):
    jobPosting, onetCode, city = info
    posting = {
        "JvID": jobPosting["JvId"],
        "JobTitle": jobPosting["JobTitle"],
        "Company": jobPosting["Company"],
        "DatePosted": jobPosting["AccquisitionDate"],
        "Url": jobPosting["URL"],
        "Location": city[0],
        "JCityID": city[1],
        "OnetCode": onetCode,
    }
    return posting


def main():
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(get_jobs, (cities[i::10] for i in range(10)))


if __name__ == "__main__":
    main()
