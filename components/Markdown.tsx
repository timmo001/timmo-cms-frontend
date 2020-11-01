import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";

import Code from "./MarkdownRenderers/Code";
import Image from "./MarkdownRenderers/Image";

interface MarkdownProps {
  source: string;
  escapeHtml: boolean;
}

function Markdown(props: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      source={props.source}
      escapeHtml={props.escapeHtml}
      renderers={{ code: Code, image: Image }}
    />
  );
}

export default Markdown;
