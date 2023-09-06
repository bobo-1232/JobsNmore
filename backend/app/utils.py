
# Retrieves query parameters from the request
def get_query_page(args):
    page = args.get("page", 1, type=int)
    per_page = args.get("per_page", 10, type=int)
    sort_by = args.get("sort_by", None, type=str)
    order = args.get("order", "asc", type=str)
    search = args.get("search", None, type=str)
    search_by = args.get("search_by", None, type=str)

    return page, per_page, sort_by, order, search, search_by