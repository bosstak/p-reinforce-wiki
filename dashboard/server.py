import http.server
import socketserver
import json
import os
import sys
import webbrowser
from pathlib import Path

# Force UTF-8 on Windows stdout
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

PORT = 8500
BASE_DIR = Path(__file__).resolve().parent.parent
DASHBOARD_DIR = BASE_DIR / "dashboard"
GRAPH_FILE = BASE_DIR / "20_Meta" / "Graph.json"

class TopologyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DASHBOARD_DIR), **kwargs)

    def do_GET(self):
        if self.path == "/api/graph":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            if GRAPH_FILE.exists():
                with open(GRAPH_FILE, "r", encoding="utf-8") as f:
                    content = f.read()
                self.wfile.write(content.encode("utf-8"))
            else:
                self.wfile.write(b'{"nodes":[], "edges":[]}')
            return
        
        # Default static file handling
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/inject":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode("utf-8"))
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "data": data}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run_server():
    os.chdir(str(DASHBOARD_DIR))
    with socketserver.TCPServer(("", PORT), TopologyHandler) as httpd:
        print("==================================================")
        print("  Live Workspace Topology Dashboard Server")
        print(f"  URL: http://localhost:{PORT}")
        print("==================================================")
        
        # Open browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down.")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
