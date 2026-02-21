---
description: how to run the application
---

To run the application easily, follow these steps:

1.  **Open a terminal** in the root directory: `c:\Users\abhay\OneDrive\Desktop\Money Muling`.
   
2.  **Install all dependencies** (if not already done):
    ```powershell
    npm run install-all
    ```
    This command will:
    *   Install root Node.js dependencies (`concurrently`).
    *   Install frontend dependencies in `frontend/`.
    *   Install backend Python dependencies in the virtual environment.

3.  **Launch the System**:
    ```powershell
    npm run dev
    ```
    This will start the **FastAPI backend** (on port 8000) and the **Vite frontend** (on port 5173) concurrently.

4.  **Access the Dashboard**:
    Open your browser to `http://localhost:5173`.
