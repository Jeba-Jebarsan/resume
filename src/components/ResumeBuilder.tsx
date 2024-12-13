import { useState } from "react";
import { generateImprovedContent } from "@/lib/gemini";
import { ResumeForm } from "./resume/ResumeForm";
import { ResumePreview } from "./resume/ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { ResumeHeader } from "./resume/ResumeHeader";
import { useResume, ResumeData } from "@/hooks/use-resume";
import { useToast } from "@/components/ui/use-toast";

export function ResumeBuilder() {
  const [selectedTheme, setSelectedTheme] = useState("purple");
  const [selectedDesign, setSelectedDesign] = useState("modern");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const {
    resumes,
    resumeName,
    setResumeName,
    saveResume,
  } = useResume();

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

  const handleSaveResume = () => {
    saveResume(resumeData, selectedTheme, selectedDesign);
  };

  const loadResume = async (resume: any) => {
    const resumeData = typeof resume.data === 'string' 
      ? JSON.parse(resume.data) 
      : resume.data;

    setResumeData({
      fullName: resumeData.fullName || "",
      email: resumeData.email || "",
      phone: resumeData.phone || "",
      summary: resumeData.summary || "",
      experience: resumeData.experience || [""],
      education: resumeData.education || [""],
      skillCategories: resumeData.skillCategories || [],
      achievements: resumeData.achievements || [],
    });
    setSelectedTheme(resumeData.theme || "purple");
    setSelectedDesign(resumeData.design || "modern");
    setIsLoadDialogOpen(false);
    
    toast({
      title: "Resume loaded",
      description: `Loaded resume: ${resume.name}`,
    });
  };

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
      <ResumeHeader
        resumeName={resumeName}
        onResumeNameChange={setResumeName}
        onSave={handleSaveResume}
        resumes={resumes}
        isLoadDialogOpen={isLoadDialogOpen}
        onLoadDialogOpenChange={setIsLoadDialogOpen}
        onLoad={loadResume}
        isPreviewMode={isPreviewMode}
        onPreviewModeChange={() => setIsPreviewMode(!isPreviewMode)}
        isMobile={isMobile}
      />

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