import type { Movie } from "../types/movie.ts";


export const Movie: React.FC<Movie> = ({
    title, 
    director, 
    //year, 
    //tags,
    //image, 
    //isWatched,
    //description
    }) => {

        return (
            <article className="movie-card">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{director}</li>
                  {/* <li className="list-group-item">{year}</li>
                  <li className="list-group-item">{tags}</li>
                  <li className="list-group-item">{isWatched ? "Vista" : "Pendiente"}</li> */}
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a>
                </div>
            </article>
        )

}