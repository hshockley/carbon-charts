// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { select } from "d3-selection";
import { TooltipTypes, Events } from "./../../interfaces";

export class Title extends Component {
	type = "title";

	render() {
		const svg = this.getContainerSVG();

		const text = svg.selectAll("text.title")
			.data([this.model.getOptions().title]);

		text.enter()
			.append("text")
			.classed("title", true)
			.merge(text)
			.attr("x", 0)
			.attr("y", 20)
			.text(d => d);

		// check the max space the title has to render
		const maxWidth = this.getMaxTitleWidth();
		const title = DOMUtils.appendOrSelect(svg, "text.title");

		// check if title needs truncation (and tooltip support)
		if (title.node().getComputedTextLength() > maxWidth) {
			this.truncateTitle(title, maxWidth);
		}
		text.exit().remove();
	}

	/**
	 * Truncates title creating ellipses and attaching tooltip for exposing full title.
	 */
	truncateTitle(title, containerWidth) {
		// the entire title string as it should appear in the tooltip
		const titleString = title.text();

		// append the ellipses to their own tspan to calculate the length
		title.append("tspan")
			.text("...");

		// get the bounding width including the elipses '...'
		const tspanLength = DOMUtils.appendOrSelect(title, "tspan").node().getComputedTextLength();
		const truncatedSize = Math.floor(containerWidth - tspanLength);

		// get the index for creating the max length substring that fit within the svg
		// use one less than the index to avoid crowding (the elipsis)
		const substringIndex = this.getSubstringIndex(title.node(), 0, titleString.length - 1, truncatedSize);

		// use the substring as the title
		title.text(titleString.substring(0, substringIndex - 1))
			.append("tspan")
			.text("...");

		// add events for displaying the tooltip with the title
		// const self = this;

		// title
		// 	.on("mouseenter", function() {
		// 		const hoveredElement = select(this);
		// 		self.services.events.dispatchEvent("show-tooltip", {
		// 			hoveredElement: hoveredElement,
		// 			type: TooltipTypes.TITLE,
		// 			data: titleString
		// add events for displaying the tooltip with the title
		const self = this;
		title.on("mouseenter", function() {
			self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
				hoveredElement: title,
				type: TooltipTypes.TITLE
				//data: titleString
			});
		})
			.on("mouseout", function() {
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement: title
				});
			});
}

	// computes the maximum space a title can take
	protected getMaxTitleWidth() {
	return DOMUtils.getSVGElementSize(this.parent).width;
}

	/**
	 * Returns the index for a maximum length substring that is less than the width parameter.
	 * @param title the title node used for getting the text lengths of substrings
	 * @param start the start index for the binary search
	 * @param end the end index for the binary search
	 * @param width the width of the svg container that holds the title
	 */
	protected getSubstringIndex(title, start, end, width) {
	const mid = Math.floor((end + start) / 2);
	if (title.getSubStringLength(0, mid) > width) {
		return this.getSubstringIndex(title, start, mid, width);
	} else if (title.getSubStringLength(0, mid) < width) {
		if (title.getSubStringLength(0, mid + 1) > width) {
			return mid;
		}
		return this.getSubstringIndex(title, mid, end, width);
	} else {
		return mid;
	}
}
}