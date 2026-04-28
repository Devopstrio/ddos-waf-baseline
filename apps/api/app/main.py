import logging
import time
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("security-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Security Protection Hub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/attacks/summary")
def get_attacks_summary():
    return [
        {"id": "atk-001", "name": "SQLi Flood", "status": "MITIGATED", "type": "L7", "blocked": "452K", "timestamp": "2026-04-28 14:00:00"},
        {"id": "atk-042", "name": "SYN Flood", "status": "MITIGATED", "type": "L4", "blocked": "12M", "timestamp": "2026-04-28 12:00:00"},
        {"id": "atk-101", "name": "Bot Scraping", "status": "ACTIVE", "type": "BOT", "blocked": "1.2M", "timestamp": "2026-04-28 14:45:00"}
    ]

@app.get("/incidents")
def get_incidents():
    return [
        {"id": "inc-001", "severity": "HIGH", "status": "OPEN", "title": "Volumetric Spike: West Europe", "age": "14m"},
        {"id": "inc-042", "severity": "CRITICAL", "status": "RESOLVED", "title": "Bypass Attempt: API Gateway", "age": "2.5h"},
        {"id": "inc-101", "severity": "MEDIUM", "status": "OPEN", "title": "WAF False Positive: Checkout Page", "age": "45m"}
    ]

@app.get("/scores/summary")
def get_scores_summary():
    return {
        "global_posture_index": 0.942,
        "active_vulnerabilities": 2,
        "critical_patches_pending": 0,
        "last_posture_review": "2026-04-20"
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_requests_blocked": "45.2M",
        "avg_mitigation_time": "14s",
        "zero_day_coverage": "OPTIMAL",
        "edge_capacity_utilization": "14%"
    }

@app.post("/protections/deploy")
def deploy_protection(target_id: str, policy_id: str):
    logger.info(f"Deploying policy {policy_id} to target {target_id}")
    return {"status": "Deployment Job Enqueued", "job_id": "job_sec_123"}

@app.post("/rules/publish")
def publish_rule(policy_id: str, rule_json: dict):
    logger.info(f"Publishing custom rule to policy {policy_id}")
    return {"status": "Rule Publication Enqueued", "job_id": "job_rule_456"}
