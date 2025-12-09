import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

export function ProjectProgress({ phases = [] }) {
  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader>
        <CardTitle>Overall Project Progress</CardTitle>
        <CardDescription>Your capstone completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{phase.name}</span>
                <span className="text-sm font-medium">{phase.progress}%</span>
              </div>
              <Progress value={phase.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
