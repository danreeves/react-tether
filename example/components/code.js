import React from 'react';
import styled from 'styled-components';
import strip from 'strip-indent';

const Code = ({ children, className }) => (
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
  margin: 0;
  margin-right: 1rem;
  line-height: 1rem;
`;

export const CodeBlock = styled(InlineCode)`
  display: block;
  line-height: 2rem;
`;
