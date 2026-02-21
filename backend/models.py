from pydantic import BaseModel
from typing import List, Optional

class Transaction(BaseModel):
    transaction_id: str
    sender_id: str
    receiver_id: str
    amount: float
    timestamp: str

class SuspiciousAccount(BaseModel):
    account_id: str
    suspicion_score: float
    detected_patterns: List[str]
    ring_id: Optional[str] = None
    recent_transactions: List[Transaction] = []
    # Hidden internal fields
    explanation: Optional[str] = None
    is_legitimate_hub: Optional[bool] = None

class FraudRing(BaseModel):
    ring_id: str
    member_accounts: List[str]
    pattern_type: str
    risk_score: float

class AnalysisSummary(BaseModel):
    total_accounts_analyzed: Optional[int] = 0
    total_transactions: int
    suspicious_accounts_flagged: int
    fraud_rings_detected: int
    avg_risk_score: float
    processing_time_seconds: float

class Node(BaseModel):
    id: str
    label: str
    risk_score: float
    tags: List[str]
    total_transactions: int
    is_legitimate: bool
    ring_id: Optional[str] = None

class Edge(BaseModel):
    from_node: str
    to_node: str
    label: str
    value: float # Total amount

class GraphData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class AnalysisResponse(BaseModel):
    suspicious_accounts: List[SuspiciousAccount]
    fraud_rings: List[FraudRing]
    graph_data: GraphData
    summary: AnalysisSummary
