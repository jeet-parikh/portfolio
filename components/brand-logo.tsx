import Image from "next/image";
import { basePath } from "@/lib/base-path";

/**
 * Renders the decorative JP monogram on a charcoal tile.
 * @param props - Optional CSS classes for the tile; defaults to h-10 w-10.
 * @returns The logo tile, with an empty image alt for use beside accessible text.
 */
export function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-[#202020] p-2 ${className}`}
    >
      <Image
        src={`${basePath}/brand/jp-mark.svg`}
        alt=""
        width={48}
        height={48}
        className="h-full w-full"
      />
    </span>
  );
}
