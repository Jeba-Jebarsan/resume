import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";

interface SaveResumeDialogProps {
  resumeName: string;
  onResumeNameChange: (name: string) => void;
  onSave: () => void;
}

export function SaveResumeDialog({
  resumeName,
  onResumeNameChange,
  onSave,
}: SaveResumeDialogProps) {
  return (
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
            placeholder="Enter resume name"
            value={resumeName}
            onChange={(e) => onResumeNameChange(e.target.value)}
          />
          <Button onClick={onSave} className="w-full">
            Save Resume
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}