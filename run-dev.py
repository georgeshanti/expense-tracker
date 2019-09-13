from app import app
from flask import request, Response
from requests import get

REACT_HOST = "http://localhost:3000"

excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']

@app.before_request
def before_request():
	if( request.path.startswith("/admin") ):
		pass 
	elif( request.path.startswith("/static") ):
		resp = get(f'{REACT_HOST}{request.path}')
		headers = [(name, value) for (name, value) in resp.raw.headers.items()
               if name.lower() not in excluded_headers]
		response = Response(resp.content, resp.status_code, headers)
		return response

@app.route('/', defaults={'u_path':''})
@app.route('/<path:u_path>')
def react_proxy(u_path):
	resp = get(f'{REACT_HOST}/{u_path}')
	headers = [(name, value) for (name, value) in resp.raw.headers.items()
               if name.lower() not in excluded_headers]
	response = Response(resp.content, resp.status_code, headers)
	return response

app.run()