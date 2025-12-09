import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, Upload } from "lucide-react";

export function DeadlineCard({ deadlines = [] }) {
  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft <= 7) return "text-red-600";
    if (daysLeft <= 14) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Items you need to submit
            </CardDescription>
          </div>
          <Clock className="w-6 h-6 text-[#FFD700]" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="p-4 border border-border rounded-lg hover:border-[#FFD700] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{deadline.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {deadline.description}
                  </p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {deadline.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{deadline.dueDate}</span>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${getDaysLeftColor(
                    deadline.daysLeft
                  )}`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{deadline.daysLeft} days left</span>
                </div>
              </div>
              <Button
                className="w-full mt-3 bg-[#800020] hover:bg-[#9B1B30]"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Submission
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
