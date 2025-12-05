import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FileText, CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react';

export function SubmissionList({ submissions = [], showActions = true }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Submissions</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Track your submission status
            </CardDescription>
          </div>
          <FileText className="w-6 h-6 text-[#FFD700]" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 border border-border rounded-lg hover:border-[#FFD700] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{submission.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {submission.groupName && `${submission.groupName} • `}
                    Submitted on {submission.submittedDate}
                    {submission.version && ` • Version ${submission.version}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {getStatusIcon(submission.status)}
                </div>
              </div>
              <Badge className={getStatusColor(submission.status)}>
                {submission.status}
              </Badge>
              {submission.feedback && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Feedback:</span> {submission.feedback}
                  </p>
                </div>
              )}
              {showActions && submission.status === 'Rejected' && (
                <Button className="w-full mt-3 bg-[#800020] hover:bg-[#9B1B30]" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Resubmit
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
