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

  const getDesignClasses = () => {
    switch (design) {
      case 'classic':
        return {
          container: "p-8 min-h-screen bg-white",
          header: "text-center border-b pb-4 mb-6",
          section: "mb-6",
          sectionTitle: "text-xl font-serif border-b mb-3 pb-1",
        };
      case 'creative':
        return {
          container: `p-8 min-h-screen bg-gradient-to-br from-${theme}-50/20 to-white`,
          header: "text-left flex items-center gap-6 mb-8",
          section: "mb-8",
          sectionTitle: "text-2xl font-bold mb-4",
        };
      case 'minimal':
        return {
          container: "p-8 min-h-screen bg-white",
          header: "mb-8",
          section: "mb-6",
          sectionTitle: "text-lg font-medium uppercase tracking-wider mb-3",
        };
      case 'professional':
        return {
          container: "p-8 min-h-screen bg-white",
          header: "bg-gray-50 p-6 mb-8",
          section: "mb-8 px-6",
          sectionTitle: "text-xl font-semibold border-l-4 pl-3 mb-4",
        };
      default: // modern
        return {
          container: `p-8 min-h-screen bg-gradient-to-r from-${theme}-50/10 to-white`,
          header: "text-center mb-8",
          section: "mb-6",
          sectionTitle: "text-xl font-semibold mb-4",
        };
    }
  };

  const classes = getDesignClasses();
  const themeColor = getThemeColor();

  return (
    <div className={classes.container}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={classes.header}>
          <h1 
            className="text-3xl font-bold"
            style={{ color: themeColor }}
          >
            {fullName}
          </h1>
          <div className="text-gray-600 mt-2">
            {email} • {phone}
          </div>
        </div>

        {summary && (
          <div className={classes.section}>
            <h2 
              className={classes.sectionTitle}
              style={{ color: themeColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className={classes.section}>
            <h2 
              className={classes.sectionTitle}
              style={{ color: themeColor }}
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
          <div className={classes.section}>
            <h2 
              className={classes.sectionTitle}
              style={{ color: themeColor }}
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
          <div className={classes.section}>
            <h2 
              className={classes.sectionTitle}
              style={{ color: themeColor }}
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
                        backgroundColor: `${themeColor}20`,
                        color: themeColor,
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
          <div className={classes.section}>
            <h2 
              className={classes.sectionTitle}
              style={{ color: themeColor }}
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