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
}: ResumePreviewProps) {
  const getGradientClass = () => {
    switch (design) {
      case "modern":
        return "bg-gradient-to-r from-purple-50 to-white";
      case "professional":
        return "bg-gradient-to-r from-blue-50 to-white";
      case "creative":
        return "bg-gradient-to-r from-pink-50 to-white";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`p-8 min-h-screen ${getGradientClass()}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
          <div className="text-gray-600 mt-2">
            {email} • {phone}
          </div>
        </div>

        {summary && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700">{exp}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-700">{edu}</p>
              </div>
            ))}
          </div>
        )}

        {skillCategories.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
            {skillCategories.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Key Achievements</h2>
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