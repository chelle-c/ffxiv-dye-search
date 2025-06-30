import type React from "react";
import type { FilterOptions } from "../types";

interface SearchAndFiltersProps {
	filters: FilterOptions;
	setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
	categories: string[];
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ filters, setFilters, categories }) => {
	return (
		<div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8 outline-solid outline outline-neutral-300 dark:outline-neutral-700">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{/* Search Input */}
				<div className="p-2">
					<label
						htmlFor="search"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-50 mb-2"
					>
						Search
					</label>
					<input
						id="search"
						type="text"
						placeholder="Enter search term"
						value={filters.search}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								search: e.target.value,
							}))
						}
						className="w-full px-4 py-2 border-r-8 border-transparent outline-2 outline-neutral-300 rounded-md placeholder:text-md focus:outline-blue-500 md:placeholder:text-md"
					/>
				</div>

				<div className="p-2">
					<label
						htmlFor="category"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-50 mb-2"
					>
						Category
					</label>
					<select
						id="category"
						value={filters.category}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								category: e.target.value,
							}))
						}
						className="w-full px-4 py-2 border-r-8 border-transparent outline-2 outline-neutral-300 rounded-md focus:outline-blue-500"
					>
						<option value="" className="text-neutral-700">
							All
						</option>
						{categories.map((category) => (
							<option key={category} value={category} className="text-neutral-700">
								{category}
							</option>
						))}
					</select>
				</div>

				<div className="p-2">
					<label
						htmlFor="sortBy"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-50 mb-2"
					>
						Sort By
					</label>
					<select
						id="sortBy"
						value={filters.sortBy}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								sortBy: e.target.value as "name" | "category",
							}))
						}
						className="w-full px-4 py-2 border-r-8 border-transparent outline-2 outline-neutral-300 rounded-md focus:outline-blue-500"
					>
						<option value="name" className="text-neutral-700">
							Name
						</option>
						<option value="category" className="text-neutral-700">
							Category
						</option>
					</select>
				</div>

				<div className="flex items-end p-2">
					<button
						type="button"
						onClick={() =>
							setFilters({
								search: "",
								category: "",
								sortBy: "name",
							})
						}
						className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors shadow-sm shadow-blue-500 active:bg-blue-700 text-shadow-xs text-shadow-neutral-600"
					>
						Clear Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchAndFilters;
