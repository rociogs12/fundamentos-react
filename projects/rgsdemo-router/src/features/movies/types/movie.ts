
export type MovieProps = {
    id: string; 
    title: string; 
    director: string; 
    year: number; 
    genre: string[];
    image: string; 
    isWatched: boolean; 
    description: string; 
}

// DTO -> Data Transfer Object 

export type NewMovieDTO = Omit<MovieProps, 'id'>; 
export type EditMovieDTO = Partial<NewMovieDTO>; 