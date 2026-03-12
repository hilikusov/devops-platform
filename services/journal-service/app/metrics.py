from prometheus_client import Counter

REQUEST_COUNT = Counter(
    "journal_requests_total",
    "Total number of requests to journal service endpoints",
    ["endpoint"]
)