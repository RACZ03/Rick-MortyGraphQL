

export interface APIResponseI<T> {
    results: T;
}

export interface DataResponseI {
    characters: APIResponseI<CharacterI[]>;
    episodes: APIResponseI<EpisodeI[]>;
}

export interface EpisodeI {
    name: string;
    episode: string;
}

export interface CharacterI {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    isFavorite?: boolean;
}