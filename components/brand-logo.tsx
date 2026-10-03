import Image from "next/image";

export function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-[#202020] p-2 ${className}`}
    >
      <Image
        src="/brand/jp-mark.svg"
        alt=""
        width={48}
        height={48}
        className="h-full w-full"
      />
    </span>
  );
}
