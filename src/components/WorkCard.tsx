import { cn } from "@/lib/utils";

interface WorkCardProps {
  caseStudy?: boolean;
  title?: string;
  description?: string;
  videoSrc?: string;
  videoAlt?: string;
  className?: string;
}

export function WorkCard({ 
  caseStudy = true, 
  title = "Upscale in Designer",
  description = "Insert short description for the project",
  videoSrc,
  videoAlt = "Project video thumbnail",
  className 
}: WorkCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-start justify-start w-full min-h-[36rem]",
        className
      )}
    >
      {/* Video thumbnail */}
      <div className="w-full flex-1 h-full rounded-xl overflow-hidden">
        {videoSrc ? (
          <video 
            src={videoSrc} 
            aria-label={videoAlt}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-bg-2 flex items-center justify-center">
            <span className="text-fg-3 text-body-1">Video placeholder</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 items-start justify-start w-full">
        {/* Labeling */}
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          <h3 className="font-ibm-plex-condensed text-title-3 text-fg-1 tracking-[-0.48px]">
            {title}
          </h3>
          <p className="font-ibm-plex text-body-1 text-fg-1 max-w-[470px]">
            {description}
          </p>
        </div>

        {/* Button - only show if caseStudy is true */}
        {caseStudy && (
          <button className="flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-lg bg-bg-2 hover:bg-bg-3 transition-colors">
            <span className="font-ibm-plex-mono text-caption-1 text-fg-1 tracking-[-0.28px]">
              VIEW CASE STUDY
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkCard;