import { renderIcon } from "./icon-utils"

export const contentType = "image/png"

const ICON_SIZES = [16, 32, 48, 512, 1024] as const

export function generateImageMetadata() {
  return ICON_SIZES.map((s) => ({
    id: s.toString(),
    size: { width: s, height: s },
    contentType,
  }))
}

export default function Icon({ id }: { id: string }) {
  const size = Number(id) || 512
  return renderIcon(size)
}
