from decouple import config

REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"
CLIENT_ID = config('CLIENT_ID')
CLIENT_SECRET = config('CLIENT_SECRET')  

