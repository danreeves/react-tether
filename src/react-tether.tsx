import React, { Component, isValidElement, RefObject } from "react";
import ReactDOM from "react-dom";
import Tether from "tether";

type TetherEvent = "repositioned" | "update";
type TetherEventHandler = (event?: { top: string; left: "string" }) => void;

interface ReactTetherProps extends Tether.ITetherOptions {
	// A HTML tag name. This is the element created in the DOM to contain the tethered component
	renderElementTag?: string;

	// Either a CSS selector to pass to document.querySelector or a DOM node
	// This is the location in the DOM the parent render element is created in
	// and the tethered component is rendered to
	renderElementTo?: string | HTMLElement;

	// Render prop for the element to be tethered to. This is rendered in place
	// of the ReactTether component
	renderTarget: (ref: React.RefObject<any>) => void;
	// Render prop for the element to be tethered. This is rendered inside the element
	// provided by renderElementTo or the end of the body via a React Portal.
	// It's wrapped in an element defined by renderElementTag
	renderElement?: (ref: React.RefObject<any>) => void;

	// The id prop for the renderElement defined by renderElementTag
	id?: string;

	// The className prop for the renderElement defined by renderElementTag
	className?: string;

	// The style prop for the renderElement defined by renderElementTag
	style?: Partial<CSSStyleDeclaration>;

	// Called on Tethers update event
	onUpdate?: TetherEventHandler;

	// Called on Tethers repositioned event
	onRepositioned?: TetherEventHandler;
}

export default class ReactTether extends Component<ReactTetherProps> {
	// The DOM node of the target, obtained using ref in the render prop
	_targetNode: RefObject<HTMLElement> = React.createRef();

	// The DOM node of the element, obtained using ref in the render prop
	_elementNode: RefObject<HTMLElement> = React.createRef();

	_elementParentNode: HTMLElement | null = null;

	_tetherInstance: Tether | null = null;

	override componentDidMount() {
		this._createContainer();
		// The container is created after mounting
		// so we need to force an update to
		// enable tether
		// Cannot move _createContainer into the constructor
		// because of is a side effect: https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
		this.forceUpdate();
	}

	override componentDidUpdate(previousProps: ReactTetherProps) {
		// If the container related props have changed, then update the container
		if (
			previousProps.renderElementTag !== this.props.renderElementTag ||
			previousProps.renderElementTo !== this.props.renderElementTo
		) {
			this._createContainer();
		}

		// Verify if className props have changed
		if (
			this._elementParentNode &&
			previousProps.className !== this.props.className
		) {
			// Add a bunch of checks against weird classNames
			const previousClasses = (previousProps.className || "")
				.split(" ")
				.filter((value) => value.length > 0);
			const currClasses = (this.props.className || "")
				.split(" ")
				.filter((value) => value.length > 0);

			this._elementParentNode.classList.remove(...previousClasses);
			this._elementParentNode.classList.add(...currClasses);
		}

		this._update();
	}

	override componentWillUnmount() {
		this._destroy();
	}

	getTetherInstance() {
		return this._tetherInstance;
	}

	disable() {
		this._tetherInstance?.disable();
	}

	enable() {
		this._tetherInstance?.enable();
	}

	on(event: TetherEvent, handler: TetherEventHandler, ctx?: unknown) {
		// @ts-expect-error -- TS types are incomplete
		this._tetherInstance.on(event, handler, ctx);
	}

	once(event: TetherEvent, handler: TetherEventHandler, ctx?: unknown) {
		// @ts-expect-error -- TS types are incomplete
		this._tetherInstance.once(event, handler, ctx);
	}

	off(event: TetherEvent, handler: TetherEventHandler) {
		// @ts-expect-error -- TS types are incomplete
		this._tetherInstance.off(event, handler);
	}

	position() {
		this._tetherInstance?.position();
	}

	_runRenders() {
		// To obtain the components, we run the render functions and pass in the ref
		// Later, when the component is mounted, the ref functions will be called
		// and trigger a tether update
		let targetComponent =
			typeof this.props.renderTarget === "function"
				? this.props.renderTarget(this._targetNode)
				: null;
		let elementComponent =
			typeof this.props.renderElement === "function"
				? this.props.renderElement(this._elementNode)
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

	_createTetherInstance(tetherOptions: Tether.ITetherOptions) {
		if (this._tetherInstance) {
			this._destroy();
		}

		this._tetherInstance = new Tether(tetherOptions);
		this._registerEventListeners();
	}

	_destroyTetherInstance() {
		if (this._tetherInstance) {
			this._tetherInstance.destroy();
			this._tetherInstance = null;
		}
	}

	_registerEventListeners() {
		this.on("update", (...args) => {
			return this.props.onUpdate && this.props.onUpdate.apply(this, args);
		});

		this.on("repositioned", (...args) => {
			return (
				this.props.onRepositioned && this.props.onRepositioned.apply(this, args)
			);
		});
	}

	get _renderNode() {
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

		const { renderElementTag = "div", className } = this.props;

		// Create a node that we can stick our content Component in
		this._elementParentNode = document.createElement(renderElementTag);
		this._elementParentNode.className = className || "";
	}

	_addContainerToDOM() {
		// Append node to the render node
		if (
			this._elementParentNode &&
			this._renderNode &&
			this._elementParentNode.parentNode !== this._renderNode
		) {
			this._renderNode.append(this._elementParentNode);
		}
	}

	_removeContainer() {
		if (this._elementParentNode && this._elementParentNode.parentNode) {
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
			// Unused, just making sure not to pass it to tether
			onUpdate,
			onRepositioned,

			renderElement,
			renderElementTag,
			renderElementTo,
			renderTarget,

			className, // This prop is specific to this._elementParentNode
			id, // This prop is specific to this._elementParentNode
			style, // This prop is specific to this._elementParentNode

			// Tether options
			...options
		} = this.props;
		const tetherOptions = {
			target: this._targetNode.current,
			element: this._elementParentNode,
			...options,
		};

		const idString = id || "";
		if (this._elementParentNode && this._elementParentNode.id !== idString) {
			this._elementParentNode.id = idString;
		}

		if (this._elementParentNode && style) {
			const elementStyle = this._elementParentNode.style;
			for (const key in style) {
				if (elementStyle[key] !== style[key]) {
					let val = style[key];
					if (val) {
						elementStyle[key] = val;
					}
				}
			}
		}

		this._addContainerToDOM();

		if (this._tetherInstance) {
			this._tetherInstance.setOptions(tetherOptions);
		} else {
			this._createTetherInstance(tetherOptions);
		}

		this._tetherInstance?.position();
	}

	override render() {
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
