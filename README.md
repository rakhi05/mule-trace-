# 🏔️ MULE TRACE: Financial Forensics Intelligence
### *Official Submission for the RIFT Financial Forensics Hackathon*

**Mule Trace** is a high-performance, web-based intelligence platform designed to expose "Money Muling" networks. It utilizes advanced graph analysis, temporal windowing, and behavior-based heuristic scoring to identify illicit fund flows and laundering "carousel" schemes with forensic precision.

---

## 🔗 Project Links
- **Live Demo**: [Mule Trace on Vercel](https://mule-trace-alpha.vercel.app/)
- **GitHub Repository**: [Mule Trace Repo](https://github.com/abhaysharma000/MULE-TRACE)
- **LinkedIn/Video Demo**: [Forensic Deep-Dive Video](https://linkedin.com/in/abhay-sharma)

---

## 🛠 Technology Stack

### **Frontend (Visual Intelligence Layer)**
- **React (Vite)**: Lightning-fast rendering and modular state management.
- **Tailwind CSS**: Premium dark-themed UI for a professional forensic command center.
- **Vis-network**: Robust force-directed graph library for interactive topology exploration.
- **Lucide Icons**: High-fidelity iconography.

### **Backend (Analytical Engine)**
- **FastAPI**: Asynchronous, high-performance Python API framework.
- **NetworkX**: Industrial-grade graph theory library for cycle detection and path traversal.
- **Pandas**: Advanced data manipulation for fuzzy CSV ingestion and vectorized temporal windowing.
- **Uvicorn**: High-speed ASGI server.

---

## 🏗 System Architecture
The platform follows a **Decoupled Forensic Architecture**:
1.  **Ingestion Layer**: Sanitizes raw input (CSV) using fuzzy logic mapping to accommodate various bank statement formats.
2.  **Graph Synthesis Engine**: Translates transactional records into a multi-directed graph where accounts are nodes and transfers are directed edges.
3.  **Heuristic Intelligence Layer**: Executes specific forensic passes to identify topological red flags.
4.  **Risk Scoring Matrix**: A weighted normalization engine that calculates a 0-100 "Suspicion Score" for every entity.
5.  **Interactive Visualization**: A dynamic UI that allows users to "scrub" through time and deep-dive into suspicious clusters.

---

## 🧠 Algorithm Approach & Complexity Analysis

### 1. Circular Fund Routing (Cycles)
- **Concept**: Detects "carousel" schemes where money eventually returns to a source or proxy.
- **Algorithm**: Uses **Johnson’s Algorithm** (via NetworkX `simple_cycles`) to find circuits of length 3-5.
- **Complexity**: $O((V+E)(c+1))$ where $c$ is the number of cycles. Optimized by restricting search to high-risk subgraphs.

### 2. Smurfing / Structuring (Temporal Windowing)
- **Concept**: Identifies many small transactions converging on or dispersing from a single account.
- **Algorithm**: Vectorized **Sliding 72-hour window**. Detects $>10$ distinct partners within any 3-day burst.
- **Complexity**: $O(N \log N)$ where $N$ is the transaction count (dominated by temporal sorting).

### 3. Layered Shell Networks
- **Concept**: Identifies "Bridge" accounts used solely to add layers of complexity.
- **Algorithm**: Linear chain traversal identifying accounts with strictly 2-3 transactions and low fund residence time.
- **Complexity**: $O(V + E)$ (Linear Breadth-First traversal).

### 4. Advanced Temporal Analysis (New)
- **Nocturnal Detection**: Flags accounts with $>40\%$ activity between 11 PM and 5 AM (dead-of-night).
- **Robotic Consistency**: Detects high-regularity cadences (Low Coefficient of Variation) suggestive of automated script behavior.

---

## 📊 Suspicion Score Methodology
The **Suspicion Score ($S$)** is calculated using a priority-weighted formula:
- **Structuring (Smurfing)**: `+40 points` (Highest priority signal)
- **Graph Cycles**: `+25 points`
- **Nocturnal Activity**: `+25 points`
- **Layered Shell Chains**: `+20 points`
- **High Velocity/Bursts**: `+15 points`

*Note: The engine includes a "Whitelist Logic" to filter out legitimate entities like payroll systems or known large-scale merchants.*

---

## 📖 Installation & Setup (One-Click)

### **Windows (Recommended)**
1.  Extract the project folder.
2.  Double-click `START_SYSTEM.bat`.
    *   This will automatically install dependencies (npm/pip), start the backend, launch the frontend, and open your browser to the dashboard.

### **Manual Setup**
1.  **Backend**:
    ```bash
    cd backend
    pip install -r requirements.txt
    python -m uvicorn main:app
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 🚀 Usage Instructions
1.  **Ingest Data**: Upload custom bank data via CSV or click **Load Demo Data**.
2.  **Forensic Replay**: Use the **Play** button to watch transactions unfold chronologically on the graph.
3.  **Inspect Topology**: Nodes turn **Red** based on their risk score (>70%).
4.  **AI Forensic Report**: Click any suspicious node to generate a deep-dive analysis (AI Laboratory).
5.  **Granular Trending**: Hover over the **Volume Trends** to see hourly or daily burst analysis.

---

## ⚠️ Known Limitations
- Cycle detection is capped at a depth of 5 hops to maintain realtime performance on larger datasets.
- Requires standard transaction timestamps (ISO 8601 or similar) for temporal analysis.
- Currently optimized for desktop resolutions (1920x1080) for the most immersive command center experience.

---

## 👥 Team Members
- **Abhay Sharma** - Lead Engineer (Graph Algorithms & Full-Stack Architecture)
- **[Insert Team Members]**

---

