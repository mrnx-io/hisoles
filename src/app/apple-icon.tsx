import { renderIcon } from "./icon-utils";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    {
      id: "apple",
      size: { width: 180, height: 180 },
      contentType,
    },
  ];
}

export default function AppleIcon() {
  return renderIcon(180);
}
