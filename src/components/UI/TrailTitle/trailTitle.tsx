import React, { useState } from "react";
import { useTrail, animated, to, config } from "react-spring";

interface TrailString {
  open: any;
}

const TrailString: React.FC<TrailString> = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail: { x: any; y: any }[] = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 135 },
    opacity: 1,
    x: 1,
    y: 1,

    from: {
      opacity: 0,
      x: 0,
      y: 0,
    },
  });

  return (
    <>
      {trail.map(({ x, y, ...rest }, index) => (
        <animated.div
          key={index}
          className="trails-text"
          style={{
            ...rest,
            transform: to(
              [
                x.to({
                  range: [0, 0.9, 1],
                  output: [0, 1.2, 1],
                }),
                y.to({
                  range: [0, 0.9, 1],
                  output: [0, 0.8, 1],
                }),
              ],
              (x, y) => `scale(${x},${y})`
            ),
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </>
  );
};

export default TrailString;
