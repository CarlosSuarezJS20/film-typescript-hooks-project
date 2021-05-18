import React, { useState } from "react";
import { useSpring, animated, to } from "react-spring";

const SqueezeString: React.FC = ({ children }) => {
  const [state, toggle] = useState(false);
  const { x, y } = useSpring({
    from: { x: !state ? 1 : 0, y: !state ? 1 : 0 },
    to: { x: 1, y: 1 },
    config: { mass: 0.5, tension: 120, friction: 2, precision: 0.001 },
    reset: state,
    onStart: (state) => toggle(false),
  });

  return (
    <animated.div
      onMouseEnter={() => toggle(true)}
      style={{
        transform: to(
          [
            x.to({
              range: [0, 0.3, 1],
              output: [1, 1.3, 1],
            }),
            y.to({
              range: [0, 0.3, 1],
              output: [1, 0.7, 1],
            }),
          ],
          (x, y) => `scale(${x},${y})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

export default SqueezeString;
