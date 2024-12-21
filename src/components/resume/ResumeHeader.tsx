import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, LogOut, User, Save, Edit } from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface ResumeHeaderProps {
  resumeName: string;
  onResumeNameChange: (name: string) => void;
  onSave: () => void;
  resumes: any[];
  isLoadDialogOpen: boolean;
  onLoadDialogOpenChange: (open: boolean) => void;
  onLoad: (resume: any) => Promise<void>;
  isPreviewMode: boolean;
  onPreviewModeChange: () => void;
  isMobile: boolean;
  onLogout: () => void;
}

export function ResumeHeader({
  resumeName,
  onResumeNameChange,
  onSave,
  resumes,
  isLoadDialogOpen,
  onLoadDialogOpenChange,
  onLoad,
  isPreviewMode,
  onPreviewModeChange,
  isMobile,
  onLogout,
}: ResumeHeaderProps) {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-3 flex-1">
        <Input
          placeholder="Resume Name"
          value={resumeName}
          onChange={(e) => onResumeNameChange(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={onSave}
          className="shrink-0"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="outline"
            onClick={onPreviewModeChange}
            className="flex-1"
          >
            {isPreviewMode ? (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </Button>
        )}
        <Button variant="outline" className="shrink-0">
          <User className="w-4 h-4 mr-2" />
          {session?.user?.email}
        </Button>
        <Button variant="outline" className="shrink-0" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}