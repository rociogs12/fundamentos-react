export interface Genres {
  id: number;
  name: string;
}


export const getGenres = async (): Promise<Genres[]> => {
  const response = await fetch("http://localhost:8000/api/genres");

  if (!response.ok) {
    throw new Error("Error loading genres");
  }

  return response.json();
};
