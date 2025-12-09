import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Settings } from "lucide-react";

export function SystemSettings({ settings, onSave }) {
  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Settings</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Configure system-wide preferences
            </CardDescription>
          </div>
          <Settings className="w-6 h-6 text-[#FFD700]" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Academic Year</Label>
            <Select defaultValue={settings?.academicYear || "2025-2026"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Semester</Label>
            <Select defaultValue={settings?.semester || "1"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">First Semester</SelectItem>
                <SelectItem value="2">Second Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default Reminder Days</Label>
            <Input type="number" defaultValue={settings?.reminderDays || 7} />
          </div>
          <div className="space-y-2">
            <Label>Max File Size (MB)</Label>
            <Input type="number" defaultValue={settings?.maxFileSize || 50} />
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-[#800020] hover:bg-[#9B1B30]" onClick={onSave}>
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
