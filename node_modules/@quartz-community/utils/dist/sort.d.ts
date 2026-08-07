import { SortFn, QuartzPluginData } from "@quartz-community/types";

declare function getDate(data: QuartzPluginData): Date | undefined;
declare function byDateAndAlphabetical(): SortFn;

export { byDateAndAlphabetical, getDate };
