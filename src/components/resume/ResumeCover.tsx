import { Badge } from "@/components/ui/badge";

interface ResumeCoverProps {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  theme: string;
  design: string;
}

export function ResumeCover({
  fullName,
  email,
  phone,
  summary,
  theme,
  design,
}: ResumeCoverProps) {
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

  const getDesignStyles = () => {
    const themeColor = getThemeColor();
    
    switch (design) {
      case 'creative':
        return {
          container: `min-h-screen bg-gradient-to-br from-${theme}-50/20 to-white p-8`,
          header: "relative z-10 mt-32",
          decoration: `absolute inset-0 bg-gradient-to-br from-${theme}-100/10 via-transparent to-transparent`,
        };
      case 'minimal':
        return {
          container: "min-h-screen bg-white p-8",
          header: "mt-32 border-l-4 pl-6",
          decoration: "hidden",
        };
      case 'professional':
        return {
          container: "min-h-screen bg-gray-50 p-8",
          header: "mt-32 bg-white p-8 shadow-lg rounded-lg",
          decoration: "hidden",
        };
      default: // modern
        return {
          container: `min-h-screen p-8 bg-gradient-to-r from-${theme}-50/10 to-white`,
          header: "mt-32",
          decoration: `absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-${theme}-100/20 via-transparent to-transparent rounded-full blur-3xl`,
        };
    }
  };

  const styles = getDesignStyles();
  const themeColor = getThemeColor();

  return (
    <div className={`relative ${styles.container}`}>
      <div className={styles.decoration} />
      
      <div className={styles.header}>
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: themeColor }}
        >
          {fullName}
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Badge
            variant="outline"
            className="text-base py-1 px-4"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            {email}
          </Badge>
          <Badge
            variant="outline"
            className="text-base py-1 px-4"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            {phone}
          </Badge>
        </div>

        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}