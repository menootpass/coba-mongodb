import clientPromise from "../lib/mongodb";
import Image from "next/image";
export default function Movies({ movies }) {
    return (
        <div>
            <h1>Top 1000 movies</h1>
            <p>
                <small>(according to metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                        <Image src={movie.poster} width={200} height={400}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps () {
    try {
        const client = await clientPromise
        const db = client.db('sample_mflix')

        const movies = await db
            .collection("movies")
            .find({})
            .sort({metacritic: -1})
            .limit(1000)
            .toArray()

        return {
            props: {movies: JSON.parse(JSON.stringify(movies))}
        }
    } catch (e) {
        console.error(e)
    }
}