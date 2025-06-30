import type React from "react";
import { useId } from "react";
import type { DyeItem } from "../types";

interface ItemCardProps {
	item: DyeItem;
}

enum CategoryBGColor {
	Blues = "#212647",
	Greens = "#425f34",
	Reds = "#7f2b2b",
	Greys = "#777575",
	Yellows = "#a1882a",
	Purples = "#4b2151",
	Browns = "#634829",
	"Special Dyes" = "#434242",
}

enum CategoryTextColor {
	Blues = "#e5e7f3",
	Greens = "#fff6eb",
	Reds = "#fff3f3",
	Greys = "#ffffff",
	Yellows = "#fffdf4",
	Purples = "#fbecfd",
	Browns = "#fff6eb",
	"Special Dyes" = "#f1f1f1",
}

const DyeCard: React.FC<ItemCardProps> = ({ item }) => {
	const keyId = useId();

	const renderLocationValue = (key: string, value: string | string[] | undefined) => {
		if (Array.isArray(value)) {
			return (
				<div className="mx-1">
					<span className="font-bold capitalize">{key}: </span>
					<div className="flex flex-wrap gap-1 my-1">
						{value?.map((v, i) => (
							<span
								key={keyId + i}
								className="inline-block text-neutral-800 text-sm bg-white px-3 py-2 rounded dark:bg-neutral-800 dark:text-white grow font-semibold outline-solid outline outline-neutral-300 dark:outline-neutral-700 m-1"
							>
								{v}
							</span>
						))}
					</div>
				</div>
			);
		}

		return (
			<div className="m-2">
				<span className="font-bold capitalize">{key}: </span>
				<span className="text-neutral-800 dark:text-white font-semibold">{value}</span>
			</div>
		);
	};

	return (
		<div className="mx-2 bg-white dark:bg-neutral-800 rounded-lg shadow-sm/20 overflow-hidden hover:shadow-sm/40 dark:shadow-white transition-shadow outline-solid outline outline-neutral-300 dark:outline-neutral-700">
			{/* Color Header */}
			<div className="h-4 w-full" style={{ backgroundColor: item.colorhex }} />

			<div className="py-4">
				{/* Name and Category */}
				<div className="mb-2 flex flex-col gap-6 justify-between items-baseline py-4 px-6">
					<div className="flex gap-4 items-center justify-around">
						<div
							className="w-6 h-6 mt-1 rounded border border-neutral-600 dark:border-neutral-500"
							style={{ backgroundColor: item.colorhex }}
						/>
						<h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
							{item.name}
						</h3>
					</div>
					<span
						className="inline-flex px-3 py-1 rounded-full text-sm font-medium text-shadow-md text-shadow-neutral-600"
						style={{
							background:
								item.category === "Special Dyes"
									? "linear-gradient(45deg, #FF5722 5%, #F44336 10%, #673AB7 30%, #2196F3 50%, #4CAF50 70%, #FFEB3B 80%, #FF9800 95%)"
									: CategoryBGColor[
											item.category as keyof typeof CategoryBGColor
									  ],
							color: CategoryTextColor[
								item.category as keyof typeof CategoryTextColor
							],
						}}
					>
						{item.category}
					</span>
				</div>

				{/* Color Info */}
				{/* <div className="mb-5">
					<div className="flex items-center gap-2">
						<div
							className="w-6 h-6 rounded border border-neutral-600 dark:border-neutral-500"
							style={{ backgroundColor: item.colorhex }}
						/>
						<span className="text-sm font-mono text-neutral-900 dark:text-neutral-50">
							{item.colorhex}
						</span>
					</div>
				</div> */}

				{/* Location */}
				<div className="">
					<h4 className="px-6 text-lg font-bold text-neutral-800 mb-2 dark:text-neutral-100">
						Location
					</h4>
					<div className="px-4 text-sm text-neutral-700 dark:text-neutral-300 locations">
						{Object.entries(item.location).map(([key, value]) => (
							<div
								key={key}
								className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md outline-solid outline outline-neutral-300 dark:outline-neutral-700 mx-1 my-2"
							>
								{renderLocationValue(key, value)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DyeCard;
