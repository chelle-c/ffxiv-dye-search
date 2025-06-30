import DyeCard from "./components/DyeCard";
import SearchAndFilters from "./components/SearchAndFilters";
import dyeData from "./data/dyelist.json";
import type { DyeItem, FilterOptions } from "./types";
import "./App.css";
import { useMemo, useRef, useState } from "react";

const App: React.FC = () => {
	const [data] = useState<DyeItem[]>(dyeData as DyeItem[]);
	const [filters, setFilters] = useState<FilterOptions>({
		search: "",
		category: "",
		sortBy: "name",
	});
	const containerRef = useRef<HTMLDivElement>(null);

	// Get unique categories for filter options
	const categories = useMemo(() => {
		return Array.from(new Set(data.map((item) => item.category)));
	}, [data]);

	const filteredData = useMemo(() => {
		const filtered = data.filter((item) => {
			const locations = Object.values(item.location);
			const locationCategories = Object.keys(item.location);

			const matchesSearch =
				filters.search === "" ||
				item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
				item.category.toLowerCase().includes(filters.search.toLowerCase()) ||
				locationCategories.some((category) =>
					category.toLowerCase().includes(filters.search.toLowerCase())
				) ||
				locations.some((location) => {
					if (typeof location === "string") {
						return location.toLowerCase().includes(filters.search.toLowerCase());
					} else {
						location?.filter((loc) =>
							loc.toLowerCase().includes(filters.search.toLowerCase())
						);
					}
				});

			const matchesCategory = filters.category === "" || item.category === filters.category;

			return matchesSearch && matchesCategory;
		});

		return filtered.sort((a, b) => {
			if (filters.sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else {
				return a.category.localeCompare(b.category);
			}
		});
	}, [data, filters]);

	return (
		<div ref={containerRef} className="min-h-screen">
			<div className="container mx-auto px-4 pt-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">FFXIV Dyes List</h1>

				<SearchAndFilters
					filters={filters}
					setFilters={setFilters}
					categories={categories}
				/>

				<div className="mb-4 text-gray-600 dark:text-gray-400">
					Showing {filteredData.length} items
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pb-8">
					{filteredData.map((item, index) => (
						<DyeCard key={`${item.name}-${index}`} item={item} />
					))}
				</div>

				{filteredData.length === 0 && (
					<div className="text-center py-12 text-gray-500 dark:text-gray-400">
						No items found matching your criteria.
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
