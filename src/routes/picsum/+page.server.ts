const host = 'https://www.mmobomb.com/api1/games';

export interface Game {
	id: number;
	title: string;
	thumbnail: string;
	short_description: string;
	game_url: string;
	genre: string;
	platform: string;
	publisher: string;
	developer: string;
	release_date: Date;
	profile_url: string;
}

function isGameList(json: unknown): json is Game[] {
	return Array.isArray(json);
}

async function handleReq<T>(url: string, validationFn: (data: unknown) => data is T, fallback: T) {
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		if (validationFn(data)) {
			return data;
		}
	}

	return fallback;
}

export const load = async function load() {
	return { games: handleReq<Game[]>(host, isGameList, []) };
};
