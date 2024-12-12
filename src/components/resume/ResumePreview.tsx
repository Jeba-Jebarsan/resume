import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skillCategories: Array<{
    name: string;
    skills: string[];
  }>;
  achievements: string[];
  design: string;
  theme: string;
  profileImage?: string;
}

export function ResumePreview({
  fullName,
  email,
  phone,
  summary,
  experience,
  education,
  skillCategories,
  achievements,
  design,
  theme,
  profileImage,
}: ResumePreviewProps) {
  const getThemeColor = () => {
    switch (theme) {
      case 'red':
        return '#ea384c';
      case 'blue':
        return '#0EA5E9';
      case 'purple':
        return '#9b87f5';
      case 'green':
        return '#10B981';
      case 'orange':
        return '#F97316';
      case 'pink':
        return '#D946EF';
      default:
        return '#9b87f5';
    }
  };

  const getGradientClass = () => {
    const color = getThemeColor();
    return `bg-gradient-to-r from-${theme}-50/10 to-white`;
  };

  return (
    <div className={`p-8 min-h-screen ${getGradientClass()}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          {profileImage && (
            <img
              src={profileImage}
              alt={fullName}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <h1 
            className="text-3xl font-bold"
            style={{ color: getThemeColor() }}
          >
            {fullName}
          </h1>
          <div className="text-gray-600 mt-2">
            {email} • {phone}
          </div>
        </div>

        {summary && (
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: getThemeColor() }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: getThemeColor() }}
            >
              Professional Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700">{exp}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: getThemeColor() }}
            >
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-700">{edu}</p>
              </div>
            ))}
          </div>
        )}

        {skillCategories.length > 0 && (
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: getThemeColor() }}
            >
              Skills
            </h2>
            {skillCategories.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      style={{
                        backgroundColor: `${getThemeColor()}20`,
                        color: getThemeColor(),
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: getThemeColor() }}
            >
              Key Achievements
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="text-gray-700">{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}