import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent } from "@/lib/gemini";
import { Eye, ArrowLeft, Save, List } from "lucide-react";
import { ResumeForm } from "./resume/ResumeForm";
import { ResumePreview } from "./resume/ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    loadResumes();
  }, []);

  const loadResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
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
        data: JSON.stringify(resumeDataWithTheme), // Convert to string to satisfy Json type
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
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          AI Resume Builder
        </h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Resume</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Enter resume name..."
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                />
                <Button onClick={saveResume} className="w-full">
                  Save Resume
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Load
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load Resume</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {resumes.length === 0 ? (
                  <p className="text-center text-gray-500">No saved resumes</p>
                ) : (
                  resumes.map((resume) => (
                    <Button
                      key={resume.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => loadResume(resume)}
                    >
                      {resume.name}
                    </Button>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

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