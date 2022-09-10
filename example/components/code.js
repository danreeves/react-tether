import React from 'react';
import styled from 'styled-components';
import strip from 'strip-indent';

const Code = ({
  children,
  className,
}: {
  children: React.Node,
  className: string,
}) => (
  <pre className={className}>
    {strip(children)
      .replace(/^\n*/, '')
      .replace(/\s*\n*$/, '')}
  </pre>
);

export const InlineCode = styled(Code)`
  display: inline-block;
  background: #333;
  color: ${({ theme }) => theme.lightText};
  padding: 1rem;
  border-radius: 4px;
  opacity: 0.9;
  line-height: 1rem;
  overflow: scroll;
  max-width: 100%;
`;

export const CodeBlock = styled(InlineCode)`
  display: block;
  line-height: 2rem;
`;
