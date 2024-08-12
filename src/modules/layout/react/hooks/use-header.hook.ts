"use client";

import { useState } from "react";
/** CONSTANTS */
import { HEADER_CATEGORIES } from "@/modules/layout/core/domain/constants";

export const useHeader = (defaultPath: string) => {
	const [currentNavigationCategory, setCurrentNavigationCategory] =
		useState<string>("");

	const updateCurrentNavigation = (newPath: string): void => {
		for (const category of HEADER_CATEGORIES) {
			if (category.href === newPath) {
				setCurrentNavigationCategory(category.category);
				break;
			}
		}
	};

	const updatePath = (newPath: string): void => {
		updateCurrentNavigation(newPath);
	};

	return {
		updatePath,
		currentNavigationCategory,
	};
};
