import requests

access_token = "GET_FROM_REDIS"

headers = {"Authorization": "Bearer " + access_token}

r = requests.get('https://www.googleapis.com/drive/v3/files', headers=headers)

print(r.text)

# Download files: https://developers.google.com/drive/api/v3/reference/files/get
# List files: https://developers.google.com/drive/api/v3/reference/files/list
# Create files: https://developers.google.com/drive/api/v3/reference/files/create
