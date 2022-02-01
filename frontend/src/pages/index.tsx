import React from "react";

import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";

const Index = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="p-5">
        <h1 className="text-xl my-4 font-medium text-center">
          Mars school register is still in demo, feel free to look around and
          login to any existing account.
        </h1>
        <p className="text-center my-4">
          Down below is a walkthrough video showcasing all the features{" "}
        </p>
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/672384548?h=05bcc8dd9f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="Mars preview"
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </Main>
  );
};

export default Routes.withoutAuth(Index);
