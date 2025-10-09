import React from 'react';

interface ProjectDetailsProps {
  role?: string;
  duration?: string;
  tools?: string;
  className?: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  role = 'Lead Designer',
  duration = '1 month',
  tools = 'Figma',
  className = ''
}) => {
  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className={`flex flex-col gap-2 items-start relative shrink-0 ${className}`}>
      <div className="text-caption-2 text-fg-3 uppercase">
        <p className="whitespace-pre">{label}</p>
      </div>
      <div className="flex flex-col gap-1 items-start relative shrink-0">
        <div className="text-body-1 text-fg-1 w-full">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8 items-start px-0 py-8 relative shrink-0 w-full">
      <DetailItem label="ROLE" value={role} />
      <DetailItem label="DURATION" value={duration} />
      <DetailItem label="TOOLS" value={tools} />
    </div>
  );
};

export default ProjectDetails;
