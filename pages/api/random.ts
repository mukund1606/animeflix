import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    await serverAuth(req);
    
    // const movieCount = await prismadb.movie.count();
    // const randomIndex = Math.floor(Math.random() * movieCount);
    // const randomMovie = await prismadb.movie.findMany({
    //   take: 1,
    //   skip: randomIndex,
    // });
    const trendingData = await fetch("https://api.consumet.org/meta/anilist/trending?perPage=50")
      .then(res => (res.json()))
    const results = trendingData.results;
    const movieCount = results.length;
    const randomIndex = Math.floor(Math.random() * movieCount);
    const movieId = results[randomIndex].id;
    const malId = results[randomIndex].malId;
    const movieTitle = results[randomIndex].title.romaji;
    const movieDescription = results[randomIndex].description;
    const moviePoster = results[randomIndex].cover;
    const genres = results[randomIndex].genres.join(", ");
    const duration = results[randomIndex].duration + " minutes";

    const data = { id: movieId, malId , title: movieTitle, description: movieDescription, thumbnailUrl: moviePoster, genres: genres, duration: duration };

    const randomMovie = [data];

    return res.status(200).json(randomMovie[0]);
  }
  catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}