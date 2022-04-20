import requests
from pprint import pprint


response = requests.get('http://127.0.0.1:8000/api/v1/json-3/')
pprint(type(response))
pprint(type(response.json()))

articles_lst = response.json()

for article in articles_lst:
    print(article.get('title'))