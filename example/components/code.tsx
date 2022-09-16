import React from "react";
import styled from "styled-components";
import strip from "strip-indent";

const Code = ({
	children,
	className,
}: {
	children: string;
	className?: string;
}) => (
	<pre className={className}>
		{strip(children)
			.replace(/^\n*/, "")
			.replace(/[\s\t]*\n*$/, "")}
	</pre>
);

export const InlineCode = styled(Code)`
	display: inline-block;
	background: white;
	color: black;
	padding: 1rem;
	border-radius: 2px;
	border: 5px solid black;
	opacity: 0.9;
	line-height: 1rem;
	overflow: scroll;
	max-width: 100%;
	font-family: monospace;
	font-weight: 200;
	tab-size: 2;
`;

export const CodeBlock = styled(InlineCode)`
	display: block;
	line-height: 2rem;
`;
