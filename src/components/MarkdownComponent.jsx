import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownComponent = ({ description }) => {
  return <ReactMarkdown>{description}</ReactMarkdown>;
};

export default MarkdownComponent;
