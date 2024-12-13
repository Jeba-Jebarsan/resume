import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent } from "@/lib/gemini";
import { ResumeForm } from "./resume/ResumeForm";
import { ResumePreview } from "./resume/ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { ResumeHeader } from "./resume/ResumeHeader";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

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
  const [resumes, setResumes] = useState<any[]>([]);
  const [resumeName, setResumeName] = useState("");
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const { session } = useSessionContext();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }
    loadResumes();
  }, [session, navigate]);

  const loadResumes = async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Error loading resumes",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setResumes(data || []);
  };

  const saveResume = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to save resumes",
        variant: "destructive",
      });
      return;
    }

    if (!resumeName.trim()) {
      toast({
        title: "Please enter a resume name",
        description: "A name is required to save your resume",
        variant: "destructive",
      });
      return;
    }

    const resumeDataWithTheme = {
      theme: selectedTheme,
      design: selectedDesign,
      ...resumeData,
    };

    const { error } = await supabase
      .from('resumes')
      .insert({
        name: resumeName,
        data: resumeDataWithTheme,
        user_id: session.user.id
      });

    if (error) {
      toast({
        title: "Error saving resume",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Resume saved successfully",
      description: "Your resume has been saved to your account",
    });

    setResumeName("");
    loadResumes();
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
        onSave={saveResume}
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