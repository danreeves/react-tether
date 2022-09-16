import React from "react";
import { render, screen } from "@testing-library/react";
import TetherComponent from "../../src/react-tether";

describe("TetherComponent", () => {
	it("should render the target", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref: any) => <div ref={ref} data-testid="target" />}
				renderElement={(ref: any) => <div ref={ref} data-testid="element" />}
			/>
		);
		expect(screen.getByTestId("target")).toBeInTheDocument();
	});

	it("should render the element", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		expect(screen.getByTestId("element")).toBeInTheDocument();
	});

	it("should create a tether element", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		const tetherElement = document.querySelector(".tether-element");
		expect(tetherElement).toBeInTheDocument();
	});

	it("should render the second child in the tether element", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		const element = document.querySelector(
			".tether-element [data-testid=element]"
		);
		expect(element).toBeInTheDocument();
	});

	it("should add className to tether element", () => {
		render(
			<TetherComponent
				attachment="top left"
				className="custom-class-1 custom-class-2"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		const tetherElement = document.querySelector(".tether-element");
		expect(tetherElement).toBeInTheDocument();
		expect(tetherElement?.classList.contains("custom-class-1")).toBe(true);
		expect(tetherElement?.classList.contains("custom-class-2")).toBe(true);
	});

	it("should swap out classes when className changes", () => {
		let { rerender } = render(
			<TetherComponent
				attachment="top left"
				className="custom-class-1 custom-class-2"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		let tetherElement = document.querySelector(".tether-element");
		expect(tetherElement?.classList.contains("custom-class-1")).toBe(true);
		expect(tetherElement?.classList.contains("custom-class-2")).toBe(true);

		rerender(
			<TetherComponent
				attachment="top left"
				className="custom-class-1 custom-class-3    custom-class-4" // Spacing is intentional
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);

		tetherElement = document.querySelector(".tether-element");
		expect(tetherElement?.classList.contains("custom-class-1")).toBe(true);
		expect(tetherElement?.classList.contains("custom-class-2")).toBe(false);
		expect(tetherElement?.classList.contains("custom-class-3")).toBe(true);
		expect(tetherElement?.classList.contains("custom-class-4")).toBe(true);
	});

	it("should render a just a target", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
			/>
		);
		expect(screen.getByTestId("target")).toBeInTheDocument();
	});

	it("should not create a tether element if there is no renderElement", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
			/>
		);
		expect(document.querySelector(".tether-element")).not.toBeInTheDocument();
	});

	it("should not create a tether element if there is no renderTarget", () => {
		render(
			// @ts-expect-error -- The types don't allow this anyway
			<TetherComponent
				attachment="top left"
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		expect(document.querySelector(".tether-element")).not.toBeInTheDocument();
	});

	it("should not create a tether element if ref is not bound to a dom node", () => {
		const FalsyComponent = () => null;
		render(
			<TetherComponent
				attachment="top left"
				renderTarget={() => <FalsyComponent />}
				renderElement={() => <FalsyComponent />}
			/>
		);
		expect(document.querySelector(".tether-element")).not.toBeInTheDocument();
	});

	it("should destroy the tether element if the first/second child is unmounted", () => {
		function ToggleComponent({
			first,
			second,
		}: {
			first?: boolean;
			second?: boolean;
		}) {
			return (
				<TetherComponent
					attachment="top left"
					renderTarget={(ref) =>
						first && <div ref={ref} data-testid="target" />
					}
					renderElement={(ref) =>
						second && <div ref={ref} data-testid="element" />
					}
				/>
			);
		}
		let { rerender } = render(<ToggleComponent first second />);

		expect(screen.getByTestId("target")).toBeInTheDocument();
		expect(
			document.querySelector(".tether-element [data-testid=element]")
		).toBeInTheDocument();

		rerender(<ToggleComponent first />);

		expect(screen.getByTestId("target")).toBeInTheDocument();
		expect(
			document.querySelector(".tether-element [data-testid=element]")
		).not.toBeInTheDocument();

		rerender(<ToggleComponent second />);

		expect(screen.queryByTestId("target")).not.toBeInTheDocument();
		expect(
			document.querySelector(".tether-element [data-testid=element]")
		).not.toBeInTheDocument();
	});

	it("allows changing the tether element tag", () => {
		render(
			<TetherComponent
				attachment="top left"
				renderElementTag="aside"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		expect(document.querySelector(".tether-element")?.nodeName).toBe("ASIDE");
	});

	it("allows changing the tether element tag on the fly", () => {
		function DifferentTagsComponent({ isAside }: { isAside: boolean }) {
			return (
				<TetherComponent
					attachment="top left"
					renderElementTag={isAside ? "aside" : "div"}
					renderTarget={(ref) => <div ref={ref} data-testid="target" />}
					renderElement={(ref) => <div ref={ref} data-testid="element" />}
				/>
			);
		}
		let { rerender } = render(<DifferentTagsComponent isAside={false} />);

		expect(document.querySelector(".tether-element")?.nodeName).toBe("DIV");

		rerender(<DifferentTagsComponent isAside={true} />);

		expect(document.querySelector(".tether-element")?.nodeName).toBe("ASIDE");
	});

	it("allows changing the tether element tag", () => {
		const container = document.createElement("div");
		container.setAttribute("id", "test-container");
		// Tether requires the container element to have position static
		container.style.position = "static";
		document.body.append(container);

		render(
			<TetherComponent
				attachment="top left"
				renderElementTo="#test-container"
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);

		expect(document.querySelector("#test-container")).toBeInTheDocument();
		expect(
			document.querySelector("#test-container .tether-element")
		).toBeInTheDocument();
	});

	it("allows changing the tether element tag on the fly", () => {
		const container = document.createElement("div");
		container.setAttribute("id", "test-container");
		// Tether requires the container element to have position static
		container.style.position = "static";
		document.body.append(container);

		const container2 = document.createElement("div");
		container2.setAttribute("id", "test-container2");
		container2.style.position = "static";
		document.body.append(container2);

		function DifferentRenderElementToComponent({ to }: { to: string }) {
			return (
				<TetherComponent
					attachment="top left"
					renderElementTo={to}
					renderTarget={(ref) => <div ref={ref} data-testid="target" />}
					renderElement={(ref) => <div ref={ref} data-testid="element" />}
				/>
			);
		}
		let { rerender } = render(
			<DifferentRenderElementToComponent to="#test-container" />
		);

		expect(document.querySelector("#test-container")).toBeInTheDocument();
		expect(
			document.querySelector("#test-container .tether-element")
		).toBeInTheDocument();

		rerender(<DifferentRenderElementToComponent to="#test-container2" />);

		expect(document.querySelector("#test-container2")).toBeInTheDocument();
		expect(
			document.querySelector("#test-container2 .tether-element")
		).toBeInTheDocument();
	});

	// Not sure how to properly test this
	it.skip("calls onUpdate", () => {
		const onUpdate = jest.fn();

		render(
			<TetherComponent
				attachment="top left"
				onUpdate={onUpdate}
				renderTarget={(ref) => (
					<div style={{ top: 0, left: 0 }} ref={ref} data-testid="target" />
				)}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		expect(onUpdate).toHaveBeenCalled();
	});

	it("passes arguments when on onRepositioned() is called", () => {
		const onRepositioned = jest.fn();

		let { rerender } = render(
			<TetherComponent
				attachment="top left"
				onRepositioned={onRepositioned}
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);
		rerender(
			<TetherComponent
				attachment="top right"
				onRepositioned={onRepositioned}
				renderTarget={(ref) => <div ref={ref} data-testid="target" />}
				renderElement={(ref) => <div ref={ref} data-testid="element" />}
			/>
		);

		expect(onRepositioned).toHaveBeenCalled();
	});
});
