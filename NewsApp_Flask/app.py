from flask import Flask, render_template, request
import requests
app = Flask(__name__)


@app.route("/")
def index():
    api_link = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=dfdf852152b9441e8f197844bc6f9226'
    api_get = requests.get(api_link)
    api_get_json = api_get.json()
    news_dict = {}
    for i, article in enumerate(api_get_json['articles']):
        temp_dict = {'img_url': article['urlToImage'], 'author': article['source']['name'], 'title': article['title'], 'description': article['description'],
                     'url': article['url'], }
        news_dict[i] = temp_dict
    return render_template('news.html', context=news_dict)


if __name__ == '__main__':
    app.run(debug=True)
