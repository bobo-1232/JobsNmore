import requests
import json
from concurrent.futures import ThreadPoolExecutor


def scrape_courses(occupations):
    courses = []
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
        }
    )
    for occupation in occupations:
        onetCode = occupation["onetCode"]
        url = (
            "https://api.careeronestop.org/v1/certificationfinder/1cgBjWAkajxAu5r/"
            + onetCode
            + "/D/0/0/0/0/0/0/0/0/25"
        )

        with session.get(url) as response:
            data = response.json()["CertList"]
            result = list(
                map(get_course_details, ((course, onetCode) for course in data))
            )
            courses.extend(result)

    return courses


def get_course_details(info):
    course, onetCode = info
    entry = {
        "Id": course["Id"],
        "OnetCode": onetCode,
        "Provider": course["Organization"],
        "Name": course["Name"],
        "Url": course["Url"],
        "Type": course["Type"],
        "Description": course["Description"],
        "Notes": course["CertDetailList"] if "CertDetailList" in course else None,
    }
    return entry


def main():
    with open("occupations.json") as f:
        occupations = json.load(f)
    # threads = []
    # for i in range(5):
    #     t = threading.Thread(target=scrape_courses, args=(occupations[i::5],))
    #     threads.append(t)
    #     t.start()

    # for thread in threads:
    #     thread.join()
    courses = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        for course_list in executor.map(
            scrape_courses, (occupations[i::5] for i in range(5))
        ):
            courses.extend(course_list)

    final = json.dumps(courses, indent=2)
    with open("courses.json", "w") as f:
        f.write(final)


if __name__ == "__main__":
    main()
