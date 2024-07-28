"use client";

/** POSTHOG */
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
		loaded: (posthog) => {
			if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
		},
	});
}

const CSPostHogProvider = ({ children }: { children: React.ReactNode }) => {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export { CSPostHogProvider };
