import React, { ReactElement } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { shadesOfPurple } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock(props: CodeBlockProps): ReactElement {
  return (
    <SyntaxHighlighter language={props.language} style={shadesOfPurple}>
      {props.value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;
