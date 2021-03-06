import {
	LayoutGrowth,
	LegendPositions,
	Alignments,
	ZoomBarTypes
} from "./enums";
import { Component } from "../components/component";
import { TruncationOptions } from "./truncation";

/**
 * customize the overlay contents
 */
export interface LayoutComponentChild {
	id: string;
	/**
	 * the component that'll be rendered inside layout child
	 */
	components: Component[];
	/**
	 * size of the layout child
	 */
	size?: number;
	/**
	 * how the layout child will grow or shrink in x & y directions
	 */
	growth?: {
		x: LayoutGrowth;
		y: LayoutGrowth;
	};
}

/**
 * customize the legend component
 */
export interface LegendOptions {
	enabled?: boolean;
	position?: LegendPositions;
	/**
	 * the clickability of legend items
	 */
	clickable?: boolean;
	truncation?: TruncationOptions;
	alignment?: Alignments;
	order?: string[];
}

export interface TooltipOptions {
	/**
	 * enable or disable tooltip
	 */
	enabled?: boolean;
	/**
	 * a function to format the tooltip values
	 */
	valueFormatter?: Function;
	/**
	 * custom function for returning tooltip HTML
	 * passed an array or object with the data, and then the default tooltip markup
	 */
	customHTML?: Function;
	/**
	 * show total of items
	 */
	showTotal?: boolean;
	truncation?: TruncationOptions;
}

/**
 * Threshold options
 */
export interface ThresholdOptions {
	/**
	 * threshold value
	 */
	value: number | Date;
	/**
	 * a function to format the threshold values
	 */
	valueFormatter?: Function;
	/**
	 * hex threshold line color
	 */
	fillColor: string;
	/**
	 * threshold label
	 */
	label: string;
}

export interface GridOptions {
	y?: {
		enabled?: boolean;
		numberOfTicks?: number;
	};
	x?: {
		enabled?: boolean;
		numberOfTicks?: number;
	};
}

/**
 * Ruler options
 */
export interface RulerOptions {
	enabled?: boolean;
}

export interface BarOptions {
	width?: number;
	maxWidth?: number;
}

export interface StackedBarOptions extends BarOptions {
	dividerSize?: number;
}

/**
 * customize the ZoomBars in a chart
 */
export interface ZoomBarsOptions {
	/**
	 * a variable to handle default zoom in ratio (0 ~ 1.0)
	 * ex: shift click zoom in ratio
	 */
	zoomRatio?: number;
	/**
	 * currently only the top position is supported
	 */
	top?: ZoomBarOptions;
}

/**
 * customize the ZoomBar component
 */
export interface ZoomBarOptions {
	/**
	 * is the zoom-bar visible or not
	 */
	enabled?: boolean;
	/**
	 * whether the zoom bar is showing a slider view or a graph view etc.
	 */
	type?: ZoomBarTypes;
	/**
	 * an two element array which represents the initial zoom domain
	 */
	initialZoomDomain?: Object[];
	/**
	 * options related to zoom bar data
	 */
	data?: Object[];
}
