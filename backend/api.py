import json
from flask import Flask
from flask import request
from pandas import read_csv
from gensim.models.doc2vec import Doc2Vec
from fetch_info import get_metadata
from flask_cors import CORS
from ast import literal_eval
# import re

app = Flask(__name__)
CORS(app)
#cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'
#lastEntry = None
movies = read_csv('https://media.githubusercontent.com/media/ammiewang/movie-rec-files/main/movie_plots_site.csv', index_col=0)
movies = movies.fillna('')

movies_by_title_and_year = movies.reset_index().set_index('title')

dm_recs = read_csv('https://media.githubusercontent.com/media/ammiewang/movie-rec-files/main/dm_recs.csv', index_col=0)
dbow_recs = read_csv('https://media.githubusercontent.com/media/ammiewang/movie-rec-files/main/dbow_recs.csv', index_col=0)
# dm = Doc2Vec.load('https://media.githubusercontent.com/media/ammiewang/movie-rec-files/main/doc2vec4.model')
# dbow = Doc2Vec.load('https://media.githubusercontent.com/media/ammiewang/movie-rec-files/main/doc2vec2.model')

# print('hello?')
@app.route('/api/recommend', methods = ['GET', 'POST'])
#@cross_origin()
def recommend():
    if request.method == 'POST':
        data = json.loads(request.data)
        title = data['title'].lower()
        algo = data['algo']
        try:
            matches = movies.loc[title]
            match_num = len(matches.shape)
            if match_num == 1:
                if algo == 0:
                    sim = literal_eval(dm_recs.loc[matches['title']]['recs'])
                    #sim = dm.docvecs.most_similar(matches['title'], topn = 10)
                else:
                    sim = literal_eval(dbow_recs.loc[matches['title']]['recs'])
                    #sim = dbow.docvecs.most_similar(matches['title'], topn = 10)
                metadata = get_metadata(movies_by_title_and_year, sim)
                return {'num_matches': match_num, 'title': matches['title'], 'recs': metadata}
                # genres = ast.literal_eval(matches['genre'])
                # actors = ast.literal_eval(matches['actor_name'])
                #director = ast.literal_eval(matches['director'])
                # return {'exists': True, 'title': matches['title'], 'summary': matches['summary'], \
                # 'cast': matches['actor_name'], 'genres': matches['genre'], 'director': matches['director']}
            else:
                #print(list(matches['title']))
                return {'num_matches': matches.shape[0], 'matches': list(matches['title'])}
        except:
            return {'num_matches': 0}

@app.route('/api/recommend-version', methods = ['GET', 'POST'])
#@cross_origin()
def recommend_version():
    if request.method == 'POST':
        data = json.loads(request.data)
        title = data['title']
        algo = data['algo']
        match = movies_by_title_and_year.loc[title]
        if algo == 0:
            sim = literal_eval(dm_recs.loc[title]['recs'])
        else:
            sim = literal_eval(dbow_recs.loc[title]['recs'])
        metadata = get_metadata(movies_by_title_and_year, sim)
        return {'num_matches': 1, 'title': title, 'recs': metadata}
