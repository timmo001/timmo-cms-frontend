import { AppProps } from "next/app";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../assets/css/style.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
