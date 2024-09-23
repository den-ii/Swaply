import React from "react";
import { Colors } from "@/constants/Colors";
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const HistorySvg = ({ fill }: { fill: string }) => {
  // Determine fill-opacity based on the fill value
  const fillActive = fill === Colors.light.tabIconSelected; // Example: Full opacity if fill is defined, half opacity otherwise

  return (
    <Svg width="21" height="24" viewBox="0 0 21 24" fill="none">
      <G clip-path="url(#clip0_2367_3669)">
        <Path
          d="M20.426 1.10493V12.781H11.1337C9.92593 12.781 8.94862 13.7583 8.94862 14.97V24.0002H1.67442C1.0626 24.0002 0.569977 23.5036 0.569977 22.8958V1.10493C0.569977 0.497089 1.0626 0.000488281 1.67442 0.000488281H19.3256C19.9334 0.000488281 20.426 0.497089 20.426 1.10493Z"
          fill={fill}
          fillOpacity={!fillActive ? "0.3" : "1"}
        />
        <Path
          d="M20.43 14.0723C19.6871 23.9526 10.4543 24.0003 10.4543 24.0003V15.1767C10.4543 14.5689 10.9469 14.0723 11.5587 14.0723H20.434H20.43Z"
          fill={fill}
          fillOpacity={fillActive ? "0.3" : "1"}
        />
        <Path
          d="M15.0588 19.7254C15.9408 19.7254 16.6559 19.0104 16.6559 18.1283C16.6559 17.2463 15.9408 16.5312 15.0588 16.5312C14.1768 16.5312 13.4617 17.2463 13.4617 18.1283C13.4617 19.0104 14.1768 19.7254 15.0588 19.7254Z"
          fill={fillActive ? fill : "#AEB7BF"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2367_3669">
          <Rect
            width="19.86"
            height="23.9997"
            transform="translate(0.569977 0.000488281)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HistorySvg;
