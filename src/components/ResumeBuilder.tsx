import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent } from "@/lib/gemini";
import { Eye, ArrowLeft } from "lucide-react";
import { ResumeForm } from "./resume/ResumeForm";
import { ResumePreview } from "./resume/ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skillCategories: SkillCategory[];
  achievements: string[];
}

export function ResumeBuilder() {
  const [selectedTheme, setSelectedTheme] = useState("purple");
  const [selectedDesign, setSelectedDesign] = useState("modern");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const isMobile = useIsMobile();
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: [""],
    education: [""],
    skillCategories: [],
    achievements: [],
  });
  const { toast } = useToast();

  const updateResumeData = (field: keyof ResumeData, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const improveContent = async (
    type: "summary" | "experience" | "skills",
    content: string,
    index?: number
  ) => {
    try {
      const improved = await generateImprovedContent(content, type);
      if (type === "summary") {
        updateResumeData("summary", improved);
      } else if (type === "experience" && typeof index === "number") {
        const newExperience = [...resumeData.experience];
        newExperience[index] = improved;
        updateResumeData("experience", newExperience);
      }
      toast({
        title: "Content Improved",
        description: "AI has enhanced your content",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-4">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          AI Resume Builder
        </h1>
        <Button
          variant="outline"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="flex items-center gap-2"
        >
          {isPreviewMode && isMobile && <ArrowLeft className="w-4 h-4" />}
          {!isMobile && <Eye className="w-4 h-4" />}
          {isPreviewMode ? "Edit Mode" : "Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {(!isPreviewMode || !resumeData.fullName || !isMobile) && (
          <div className="lg:order-1 space-y-4 md:space-y-8">
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeSelect={setSelectedTheme}
            />
            <ResumeForm
              data={resumeData}
              selectedDesign={selectedDesign}
              onUpdate={updateResumeData}
              onDesignSelect={setSelectedDesign}
              onImproveContent={improveContent}
            />
          </div>
        )}
        
        {(isPreviewMode || resumeData.fullName || !isMobile) && (
          <div className="lg:order-2 sticky top-8">
            <ResumePreview
              {...resumeData}
              design={selectedDesign}
              theme={selectedTheme}
            />
          </div>
        )}
      </div>
    </div>
  );
}