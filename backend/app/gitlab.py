import requests


urls = [
    # commits by user and total for a branch, uses email
    "https://gitlab.com/api/v4/projects/42829136/repository/commits",
    # issues by user, uses username
    "https://gitlab.com/api/v4/projects/42829136/issues",
]


def get_commits():
    session = requests.Session()
    users = {}
    total = 0
    page_num = 1
    while True:
        with session.get(
            urls[0], params={"page": page_num, "per_page": 100}, timeout=5
        ) as response:
            data = response.json()

        if len(data) == 0:
            break

        for commit in data:
            total += 1
            if commit["author_email"] in users:
                users[commit["author_email"]] += 1
            else:
                users[commit["author_email"]] = 1

        page_num += 1

    return total, users


def get_issues():
    response = requests.get(urls[1], params={"per_page": 100}, timeout=5)
    data = response.json()
    total = 0
    users = {}
    for issue in data:
        total += 1
        if issue["author"]["username"] not in users:
            users[issue["author"]["username"]] = 1
        else:
            users[issue["author"]["username"]] += 1
    return total, users


if __name__ == "__main__":
    print(get_commits())
    print(get_issues())
