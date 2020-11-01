import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";

import CodeBlock from "./MarkdownRenderers/CodeBlock";

interface MarkdownProps {
  source: string;
  escapeHtml: boolean;
}

function Markdown(props: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      source={props.source}
      escapeHtml={props.escapeHtml}
      renderers={{ code: CodeBlock }}
    />
  );
}

export default Markdown;
