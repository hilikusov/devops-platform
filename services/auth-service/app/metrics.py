from prometheus_client import Counter

REQUEST_COUNT = Counter(
    "auth_requests_total",
    "Total number of requests to auth service endpoints",
    ["endpoint"]
)