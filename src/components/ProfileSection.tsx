import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

interface ProfileSectionProps {
  fullName: string;
  email: string;
  phone: string;
  onUpdate: (field: string, value: string) => void;
}

export function ProfileSection({ fullName, email, phone, onUpdate }: ProfileSectionProps) {
  const [profileImage, setProfileImage] = useState<string>("");
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      setProfileImage(publicUrl);
      onUpdate('profileImage', publicUrl);

      toast({
        title: "Success",
        description: "Profile image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative group">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-primary/10">
              {fullName.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button size="icon" variant="secondary" className="rounded-full">
              <Upload className="w-4 h-4" />
            </Button>
          </label>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
            className="text-lg font-semibold"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => onUpdate("email", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => onUpdate("phone", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}