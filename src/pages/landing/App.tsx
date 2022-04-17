import Hero from "./Hero";
import Features from "./Features";
import React from "react";
import { Helmet } from "react-helmet";

const Landing = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://cdn.discordapp.com/attachments/937506444331335760/964505910187814942/logo-dispace-removebg-preview.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discord in a Space" />
        <meta property="og:title" content="Dispace" />
        <meta property="og:url" content="http://localhost" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/937506444331335760/964505910187814942/logo-dispace-removebg-preview.png"
        />
        <meta property="og:description" content="Discord in a Space" />
        <title>Dispace | Discord in a Space</title>
      </Helmet>
      <Hero />
      <Features />
    </>
  );
};

export default Landing;
