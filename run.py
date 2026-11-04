import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    current_port = PORT
    server = None
    
    # Attempt to bind to PORT or find available port
    for p in range(current_port, current_port + 20):
        try:
            server = socketserver.TCPServer(("", p), PortfolioHandler)
            current_port = p
            break
        except OSError:
            continue
            
    if not server:
        print("Could not find an open port between 3000 and 3020.")
        sys.exit(1)

    url = f"http://localhost:{current_port}"
    print("=" * 60)
    print("  Pittala Manogna - Modern Personal Portfolio Website")
    print("=" * 60)
    print(f"  [+] Server running at:       {url}")
    print(f"  [+] Admin Portal URL:        {url}/#/admin/login")
    print("  [+] Default Admin Email:     manogna2902@gmail.com")
    print("  [+] Default Admin Password:  AdminPassword@2026")
    print("=" * 60)
    print("  Press Ctrl+C to stop the server anytime.")
    print("=" * 60)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping portfolio server...")
        server.server_close()

if __name__ == "__main__":
    run_server()

