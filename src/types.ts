export interface LocationData {
	[key: string]: string | string[] | undefined;
}

export interface DyeItem {
	name: string;
	colorhex: string;
	category: string;
	location: LocationData;
}

export interface FilterOptions {
	search: string;
	category: string;
	sortBy: "name" | "category";
}
