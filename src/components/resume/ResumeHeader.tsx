import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft } from "lucide-react";
import { SaveResumeDialog } from "./SaveResumeDialog";
import { LoadResumeDialog } from "./LoadResumeDialog";

interface ResumeHeaderProps {
  resumeName: string;
  onResumeNameChange: (name: string) => void;
  onSave: () => void;
  resumes: any[];
  isLoadDialogOpen: boolean;
  onLoadDialogOpenChange: (open: boolean) => void;
  onLoad: (resume: any) => void;
  isPreviewMode: boolean;
  onPreviewModeChange: () => void;
  isMobile: boolean;
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
}: ResumeHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
        AI Resume Builder
      </h1>
      <div className="flex gap-2">
        <SaveResumeDialog
          resumeName={resumeName}
          onResumeNameChange={onResumeNameChange}
          onSave={onSave}
        />
        <LoadResumeDialog
          resumes={resumes}
          isOpen={isLoadDialogOpen}
          onOpenChange={onLoadDialogOpenChange}
          onLoad={onLoad}
        />
        <Button
          variant="outline"
          onClick={onPreviewModeChange}
          className="flex items-center gap-2"
        >
          {isPreviewMode && isMobile && <ArrowLeft className="w-4 h-4" />}
          {!isMobile && <Eye className="w-4 h-4" />}
          {isPreviewMode ? "Edit Mode" : "Preview"}
        </Button>
      </div>
    </div>
  );
}