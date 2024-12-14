import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skillCategories: SkillCategory[];
  achievements: string[];
}

export interface Resume {
  id: string;
  name: string;
  data: ResumeData & {
    theme: string;
    design: string;
  };
}

export function useResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [resumeName, setResumeName] = useState("");
  const { session } = useSessionContext();
  const navigate = useNavigate();
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

    // Transform the raw data into the correct Resume type
    const transformedResumes: Resume[] = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      data: typeof item.data === 'string' ? JSON.parse(item.data) : item.data
    }));

    setResumes(transformedResumes);
  };

  const saveResume = async (resumeData: ResumeData, theme: string, design: string) => {
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
      ...resumeData,
      theme,
      design,
    };

    const { error } = await supabase
      .from('resumes')
      .insert({
        name: resumeName,
        data: JSON.stringify(resumeDataWithTheme),
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

  return {
    resumes,
    resumeName,
    setResumeName,
    saveResume,
    loadResumes,
  };
}