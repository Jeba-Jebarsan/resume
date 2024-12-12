import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ProfileSectionProps {
  fullName: string;
  email: string;
  phone: string;
  onUpdate: (field: string, value: string) => void;
}

export function ProfileSection({ fullName, email, phone, onUpdate }: ProfileSectionProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col space-y-4 w-full">
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
    </Card>
  );
}