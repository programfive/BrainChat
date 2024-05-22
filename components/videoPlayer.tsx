import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface VideoPlayerProps {
  url: string;
  width?: string | number;
  height?: string | number;
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  width = "100%",
  height = "auto",
}) => {
  return (
    <ReactPlayer
      url={url}
      controls
      width={width}
      height={height}
      className="rounded-lg"
    />
  );
};
