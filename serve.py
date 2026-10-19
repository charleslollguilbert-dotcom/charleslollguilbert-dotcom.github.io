#!/usr/bin/env python3
"""Serveur de dev local : reproduit la réécriture /page -> page.html de l'hébergeur.
Usage : python3 serve.py  (puis ouvrir http://localhost:8000)"""
import os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def translate_path(self, path):
        clean = path.split('?', 1)[0].split('#', 1)[0]
        if clean == '/':
            clean = '/index.html'
        elif '.' not in os.path.basename(clean) and os.path.isfile(os.path.join(ROOT, clean.lstrip('/') + '.html')):
            clean += '.html'
        return super().translate_path(clean)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Lumaitec -> http://localhost:{port}')
    ThreadingHTTPServer(('', port), Handler).serve_forever()
