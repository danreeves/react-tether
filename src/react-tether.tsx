import React, { Component, Children, isValidElement } from "react";
import ReactDOM from "react-dom";
import Tether from "tether";

if (!Tether) {
	console.error(
		"It looks like Tether has not been included. Please load this dependency first https://github.com/HubSpot/tether"
	);
}

// @ts-expect-error
const childrenPropType = ({ children }, propName, componentName) => {
	const childCount = Children.count(children);
	if (childCount > 0) {
		return new Error(
			`${componentName} no longer uses children to render components. Please use renderTarget and renderElement instead.`
		);
	}
};

// @ts-expect-error
const attachmentPositions = [
	"auto auto",
	"top left",
	"top center",
	"top right",
	"middle left",
	"middle center",
	"middle right",
	"bottom left",
	"bottom center",
	"bottom right",
];

class TetherComponent extends Component {
	static defaultProps = {
		renderElementTag: "div",
		renderElementTo: null,
	};

	// The DOM node of the target, obtained using ref in the render prop
	_targetNode = React.createRef();

	// The DOM node of the element, obtained using ref in the render prop
	_elementNode = React.createRef();

	_elementParentNode = null;

	_tetherInstance = null;

	// @ts-expect-error
	componentDidMount() {
		this._createContainer();
		// The container is created after mounting
		// so we need to force an update to
		// enable tether
		// Cannot move _createContainer into the constructor
		// because of is a side effect: https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
		this.forceUpdate();
	}

	// @ts-expect-error
	componentDidUpdate(previousProps) {
		// If the container related props have changed, then update the container
		if (
			// @ts-expect-error
			previousProps.renderElementTag !== this.props.renderElementTag ||
			// @ts-expect-error
			previousProps.renderElementTo !== this.props.renderElementTo
		) {
			this._createContainer();
		}

		// Verify if className props have changed
		if (
			this._elementParentNode &&
			// @ts-expect-error
			previousProps.className !== this.props.className
		) {
			// Add a bunch of checks against weird classNames
			const previousClasses = (previousProps.className || "")
				.split(" ")
				// @ts-expect-error
				.filter((value) => value.length > 0);
			// @ts-expect-error
			const currClasses = (this.props.className || "")
				.split(" ")
				// @ts-expect-error
				.filter((value) => value.length > 0);

			// @ts-expect-error
			this._elementParentNode.classList.remove(...previousClasses);
			// @ts-expect-error
			this._elementParentNode.classList.add(...currClasses);
		}

		this._update();
	}

	// @ts-expect-error
	componentWillUnmount() {
		this._destroy();
	}

	getTetherInstance() {
		return this._tetherInstance;
	}

	disable() {
		// @ts-expect-error
		this._tetherInstance.disable();
	}

	enable() {
		// @ts-expect-error
		this._tetherInstance.enable();
	}

	// @ts-expect-error
	on(event, handler, ctx) {
		// @ts-expect-error
		this._tetherInstance.on(event, handler, ctx);
	}

	// @ts-expect-error
	once(event, handler, ctx) {
		// @ts-expect-error
		this._tetherInstance.once(event, handler, ctx);
	}

	// @ts-expect-error
	off(event, handler) {
		// @ts-expect-error
		this._tetherInstance.off(event, handler);
	}

	position() {
		// @ts-expect-error
		this._tetherInstance.position();
	}

	_runRenders() {
		// To obtain the components, we run the render functions and pass in the ref
		// Later, when the component is mounted, the ref functions will be called
		// and trigger a tether update
		let targetComponent =
			// @ts-expect-error
			typeof this.props.renderTarget === "function"
				? // @ts-expect-error
				this.props.renderTarget(this._targetNode)
				: null;
		let elementComponent =
			// @ts-expect-error
			typeof this.props.renderElement === "function"
				? // @ts-expect-error
				this.props.renderElement(this._elementNode)
				: null;

		// Check if what has been returned is a valid react element
		if (!isValidElement(targetComponent)) {
			targetComponent = null;
		}

		if (!isValidElement(elementComponent)) {
			elementComponent = null;
		}

		return {
			targetComponent,
			elementComponent,
		};
	}

	// @ts-expect-error
	_createTetherInstance(tetherOptions) {
		if (this._tetherInstance) {
			this._destroy();
		}

		// @ts-expect-error
		this._tetherInstance = new Tether(tetherOptions);
		this._registerEventListeners();
	}

	_destroyTetherInstance() {
		if (this._tetherInstance) {
			// @ts-expect-error
			this._tetherInstance.destroy();

			this._tetherInstance = null;
		}
	}

	_registerEventListeners() {
		// @ts-expect-error
		this.on("update", (...args) => {
			// @ts-expect-error
			return this.props.onUpdate && this.props.onUpdate.apply(this, args);
		});

		// @ts-expect-error
		this.on("repositioned", (...args) => {
			return (
				// @ts-expect-error
				this.props.onRepositioned && this.props.onRepositioned.apply(this, args)
			);
		});
	}

	get _renderNode() {
		// @ts-expect-error
		const { renderElementTo } = this.props;
		if (typeof renderElementTo === "string") {
			return document.querySelector(renderElementTo);
		}

		return renderElementTo || document.body;
	}

	_destroy() {
		this._destroyTetherInstance();
		this._removeContainer();
	}

	_createContainer() {
		// Create element node container if it hasn't been yet
		this._removeContainer();

		// @ts-expect-error
		const { renderElementTag, className } = this.props;

		// Create a node that we can stick our content Component in
		this._elementParentNode = document.createElement(renderElementTag);
		// @ts-expect-error
		this._elementParentNode.className = className || "";
	}

	_addContainerToDOM() {
		// Append node to the render node
		// @ts-expect-error
		if (this._elementParentNode.parentNode !== this._renderNode) {
			this._renderNode.append(this._elementParentNode);
		}
	}

	_removeContainer() {
		// @ts-expect-error
		if (this._elementParentNode && this._elementParentNode.parentNode) {
			// @ts-expect-error
			this._elementParentNode.remove();
		}
	}

	_update() {
		// If no element component provided, bail out
		const shouldDestroy =
			!this._elementNode.current || !this._targetNode.current;

		if (shouldDestroy) {
			// Destroy Tether element if it has been created
			this._destroy();
			return;
		}

		this._updateTether();
	}

	_updateTether() {
		const {
			// @ts-expect-error
			children,
			// @ts-expect-error
			renderElementTag,
			// @ts-expect-error
			renderElementTo,
			// @ts-expect-error
			id,
			// @ts-expect-error
			className, // This prop is specific to this._elementParentNode
			// @ts-expect-error
			style,
			// @ts-expect-error
			renderTarget,
			// @ts-expect-error
			renderElement,
			...options
		} = this.props;
		const tetherOptions = {
			target: this._targetNode.current,
			element: this._elementParentNode,
			...options,
		};

		const idString = id || "";
		// @ts-expect-error
		if (this._elementParentNode.id !== idString) {
			// @ts-expect-error
			this._elementParentNode.id = idString;
		}

		if (style) {
			// @ts-expect-error
			const elementStyle = this._elementParentNode.style;
			for (const key of Object.keys(style)) {
				if (elementStyle[key] !== style[key]) {
					elementStyle[key] = style[key];
				}
			}
		}

		this._addContainerToDOM();

		if (this._tetherInstance) {
			// @ts-expect-error
			this._tetherInstance.setOptions(tetherOptions);
		} else {
			this._createTetherInstance(tetherOptions);
		}

		// @ts-expect-error
		this._tetherInstance.position();
	}

	// @ts-expect-error
	render() {
		const { targetComponent, elementComponent } = this._runRenders();

		if (!targetComponent) {
			return null;
		}

		return (
			<React.Fragment>
				{targetComponent}
				{elementComponent &&
					this._elementParentNode &&
					ReactDOM.createPortal(elementComponent, this._elementParentNode)}
			</React.Fragment>
		);
	}
}

export default TetherComponent;
