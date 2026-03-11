from prometheus_client import Counter

REQUEST_COUNT = Counter(
    "product_requests_total",
    "Total number of requests to product service endpoints",
    ["endpoint"]
)