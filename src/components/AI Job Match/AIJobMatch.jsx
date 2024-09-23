import React from "react";
import { Container } from "../Container/Container";

const AIJobMatch = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen text-3xl text-violet">
        AI Job Match is coming soon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" fill="#020246" />
          <g>
            <circle cx="4" cy="12" r="3" fill="#020246" />
            <circle cx="20" cy="12" r="3" fill="#020246" />
            <animateTransform
              attributeName="transform"
              calcMode="spline"
              dur="1.5s"
              keySplines=".36,.6,.31,1;.36,.6,.31,1"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;180 12 12;360 12 12"
            />
          </g>
        </svg>
      </div>
    </Container>
  );
};

export default AIJobMatch;
