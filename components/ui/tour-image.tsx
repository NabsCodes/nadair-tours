"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/data/constants";

type TourImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function TourImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
}: TourImageProps) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_IMAGE);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== PLACEHOLDER_IMAGE) {
      setHasError(true);
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  if (fill) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
          onError={handleError}
        />
        {hasError && (
          <div className="bg-muted absolute inset-0 flex items-center justify-center">
            <ImageOff className="text-muted-foreground h-8 w-8" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
      />
      {hasError && (
        <div className="bg-muted absolute inset-0 flex items-center justify-center">
          <ImageOff className="text-muted-foreground h-8 w-8" />
        </div>
      )}
    </div>
  );
}

