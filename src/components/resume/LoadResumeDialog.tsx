import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { List } from "lucide-react";

interface LoadResumeDialogProps {
  resumes: any[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLoad: (resume: any) => void;
}

export function LoadResumeDialog({
  resumes,
  isOpen,
  onOpenChange,
  onLoad,
}: LoadResumeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                onClick={() => onLoad(resume)}
              >
                {resume.name}
              </Button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}