import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Container } from "react-bootstrap";

const Markdown = ({ markdown }) => {
  return (
    <Container className="markdown-container py-5 mb-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {markdown}
      </ReactMarkdown>
    </Container>
  );
};

export default Markdown;
