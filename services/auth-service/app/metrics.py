from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter(
    "auth_requests_total",
    "Total number of auth requests"
)

REQUEST_LATENCY = Histogram(
    "auth_request_latency_seconds",
    "Latency of auth requests"
)
