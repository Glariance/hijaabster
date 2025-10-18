import Image from "next/image"

type LoaderOverlayProps = {
  message?: string
  subMessage?: string
}

const loaderImage = "/scarfWomenStanding2.png"

export function LoaderOverlay({
  message = "Styling in progress",
  subMessage = "We're preparing the next look - hang tight while the scarves get into position.",
}: LoaderOverlayProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black/90">
      <div className="flex flex-col items-center gap-6 text-center text-white">
        <div className="relative h-40 w-40 animate-[float_3s_ease-in-out_infinite]">
          <Image
            src={loaderImage}
            alt="Silk scarf in motion"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_30px_rgba(190,68,108,0.35)]"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">{message}</p>
          <p className="text-sm text-white/80 md:text-base/relaxed">{subMessage}</p>
        </div>
      </div>
    </div>
  )
}

