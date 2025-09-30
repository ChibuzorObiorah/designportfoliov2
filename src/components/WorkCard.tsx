import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface WorkCardProps {
  title?: string;
  description?: string;
  videoSrc?: string;
  videoAlt?: string;
  className?: string;
  caseStudyLink?: string;
}

export function WorkCard({
  title = "Upscale in Designer",
  description = "Insert short description for the project",
  videoSrc,
  videoAlt = "Project video thumbnail",
  className,
  caseStudyLink,
}: WorkCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (caseStudyLink) {
      navigate(caseStudyLink);
    }
  };

  // Helper function to determine if the file is an image or video
  const isImage = (src: string) => {
    if (!src) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => src.toLowerCase().endsWith(ext));
  };

  return (
    <div
      className={cn(
        "group relative w-full rounded-xl overflow-hidden",
        caseStudyLink ? "cursor-pointer" : "cursor-default",
        className,
      )}
      onClick={handleCardClick}
      data-oid="4pmrqey"
    >
      {/* Video thumbnail */}
      <div
        className="w-full h-full bg-bg-2 rounded-xl overflow-hidden"
        data-oid="bt_-q3p"
      >
        {videoSrc && (
          isImage(videoSrc) ? (
            <img
              src={videoSrc}
              alt={videoAlt}
              className="w-full h-full object-cover transform scale-105 group-hover:blur-sm transition-all duration-300"
              data-oid="ny_c509"
            />
          ) : (
            <video
              src={videoSrc}
              aria-label={videoAlt}
              className="w-full h-full object-cover transform scale-105 group-hover:blur-sm transition-all duration-300"
              autoPlay
              loop
              muted
              playsInline
              data-oid="ny_c509"
            />
          )
        )}
      </div>

      {/* Dark overlay - only visible on hover */}
      <div className="absolute bottom-0 left-0 w-[60%] h-full bg-bg-1 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-xl" />

      {/* Content - only visible on hover */}
      <div
        className="absolute bottom-0 left-0 w-[60%] flex flex-col gap-3 items-start justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        data-oid="wp2aqee"
      >
        {/* Labeling */}
        <div
          className="flex flex-col gap-2 items-start justify-start w-full"
          data-oid="k435fmj"
        >
          <h3
            className="font-ibm-plex-condensed text-title-3 text-fg-1 tracking-[-0.48px]"
            data-oid="v95s856"
          >
            {title}
          </h3>
          <p
            className="font-ibm-plex text-body-1 text-fg-1 max-w-[470px]"
            data-oid="3mog6u3"
          >
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}

export default WorkCard;
