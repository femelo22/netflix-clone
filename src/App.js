import React, { useEffect, useState } from 'react'
import Tmdb from './api/Tmdb'
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeaturedMovie'
import './App.css'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeacturedData] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);


  const loadAll = async () => {
    //Pegando a lista TOTAL
    let list = await Tmdb.getHomeList();
    //Pegando o filme em destaque
    let originals = list.filter(i => i.slug === 'originals'); //filtra a lista com os filmes que possuem o slug = originals
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setMovieList(list);
    setFeacturedData(chosenInfo);
  }

  return (
    <div className="page">

      {
        featuredData &&
        <FeatureMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>
    </div>
  )
}