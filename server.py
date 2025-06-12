from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import threading
import os

def open_browser(port):
    webbrowser.open(f'http://localhost:{port}')

def run_server():
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Starting server on port {port}...')
    # Open browser in a separate thread
    threading.Thread(target=open_browser, args=(port,)).start()
    httpd.serve_forever()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run_server()
