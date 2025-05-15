'use client'

import Image from "next/image"
import { Reference } from "@/types/aiOverview"
import { getFaviconUrl } from "@/lib/utils"

interface ReferenceIconProps {
  reference: Reference
  difficultyColor: string
}


export default function ReferenceIcon({ reference, difficultyColor }: ReferenceIconProps) {
  return (
    <div
      key={reference.index}
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${difficultyColor} overflow-hidden`}
      title={`${reference.title} - ${reference.difficulty}`}
    >
      <Image
        src={getFaviconUrl(reference.link)}
        alt={`${reference.title} favicon`}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
    </div>
  )
} 