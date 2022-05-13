def get_metadata(df, movies):
    metadata = []
    for movie, score in movies:
        movie_md = {}
        movie_row = df.loc[movie]
        movie_md['title'] = movie
        movie_md['score'] = score
        movie_md['summary'] = movie_row['summary']
        movie_md['cast'] = movie_row['actor_name']
        movie_md['genre'] = movie_row['genre']
        movie_md['director'] = movie_row['director']
        metadata.append(movie_md)
    return metadata
