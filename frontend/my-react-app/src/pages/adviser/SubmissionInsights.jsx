import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users,
  Calendar,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export function SubmissionInsights() {
  const [timeRange, setTimeRange] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock analytics data
  const metrics = {
    totalSubmissions: 156,
    pendingReviews: 23,
    approvalRate: 78.5,
    averageTurnaround: 4.2,
    thisWeek: 12,
    thisMonth: 48
  };

  // Mock submission trend data
  const trendData = [
    { period: 'Week 1', submissions: 8, approvals: 6, revisions: 2 },
    { period: 'Week 2', submissions: 12, approvals: 9, revisions: 3 },
    { period: 'Week 3', submissions: 15, approvals: 11, revisions: 4 },
    { period: 'Week 4', submissions: 13, approvals: 10, revisions: 3 }
  ];

  // Mock recent submissions
  const recentSubmissions = [
    {
      id: 1,
      student: 'John Doe',
      studentId: '2021-12345',
      title: 'Capstone Proposal',
      version: '3.0',
      submittedAt: '2025-12-17 09:30 AM',
      status: 'pending',
      daysOpen: 1
    },
    {
      id: 2,
      student: 'Jane Smith',
      studentId: '2021-12346',
      title: 'Final Document',
      version: '2.0',
      submittedAt: '2025-12-16 02:15 PM',
      status: 'approved',
      daysOpen: 2
    },
    {
      id: 3,
      student: 'Bob Johnson',
      studentId: '2021-12347',
      title: 'Chapter 3 Revision',
      version: '4.0',
      submittedAt: '2025-12-15 11:00 AM',
      status: 'revision',
      daysOpen: 3
    },
    {
      id: 4,
      student: 'Alice Williams',
      studentId: '2021-12348',
      title: 'Methodology Draft',
      version: '1.0',
      submittedAt: '2025-12-14 04:45 PM',
      status: 'pending',
      daysOpen: 4
    },
    {
      id: 5,
      student: 'Charlie Brown',
      studentId: '2021-12349',
      title: 'Literature Review',
      version: '2.0',
      submittedAt: '2025-12-13 10:20 AM',
      status: 'approved',
      daysOpen: 5
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-blue-500', label: 'Pending Review' },
      approved: { color: 'bg-green-500', label: 'Approved' },
      revision: { color: 'bg-yellow-500', label: 'Needs Revision' },
      rejected: { color: 'bg-red-500', label: 'Rejected' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredSubmissions = statusFilter === 'all' 
    ? recentSubmissions 
    : recentSubmissions.filter(s => s.status === statusFilter);

  // TODO: API call to fetch analytics data
  // const fetchAnalytics = async (timeRange) => { ... }

  // TODO: API call to filter submissions by status
  // const filterByStatus = async (status) => { ... }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800020]">Real-Time Submission Insights</h1>
          <p className="text-muted-foreground">Monitor submission trends and analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#800020]">{metrics.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-semibold">+{metrics.thisWeek}</span> this week
            </p>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        {/* Approval Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.approvalRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Average Turnaround */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Turnaround</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FFD700]">{metrics.averageTurnaround} days</div>
            <p className="text-xs text-muted-foreground">
              Average review time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#800020]" />
            Submission Trends
          </CardTitle>
          <CardDescription>Weekly submission and approval patterns</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simple Bar Chart Visualization */}
          <div className="space-y-4">
            {trendData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.period}</span>
                  <span className="text-muted-foreground">
                    {data.submissions} submissions
                  </span>
                </div>
                <div className="flex gap-1 h-8">
                  {/* Submissions bar */}
                  <div 
                    className="bg-blue-500 rounded flex items-center justify-center text-xs text-white font-semibold"
                    style={{ width: `${(data.submissions / 20) * 100}%` }}
                  >
                    {data.submissions}
                  </div>
                  {/* Approvals bar */}
                  <div 
                    className="bg-green-500 rounded flex items-center justify-center text-xs text-white font-semibold"
                    style={{ width: `${(data.approvals / 20) * 100}%` }}
                  >
                    {data.approvals}
                  </div>
                  {/* Revisions bar */}
                  <div 
                    className="bg-yellow-500 rounded flex items-center justify-center text-xs text-white font-semibold"
                    style={{ width: `${(data.revisions / 20) * 100}%` }}
                  >
                    {data.revisions}
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    Submitted
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    Approved
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded" />
                    Revisions
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for chart library integration */}
          <div className="mt-6 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
            <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Enhanced chart visualization available with Chart.js or Recharts integration
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#800020]" />
                Recent Submissions
              </CardTitle>
              <CardDescription>Latest document submissions requiring review</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="approved">Approved Only</SelectItem>
                <SelectItem value="revision">Needs Revision</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No submissions found for selected filter</p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#800020]">{submission.title}</h4>
                        <Badge variant="outline">v{submission.version}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {submission.student}
                        </span>
                        <span>ID: {submission.studentId}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {submission.submittedAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(submission.status)}
                        <span className="text-xs text-muted-foreground">
                          {submission.daysOpen} {submission.daysOpen === 1 ? 'day' : 'days'} open
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      {submission.status === 'pending' && (
                        <Button size="sm" className="bg-[#800020] hover:bg-[#9B1B30]">
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#800020]">{metrics.thisWeek}</div>
            <p className="text-sm text-muted-foreground">New submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#800020]">{metrics.thisMonth}</div>
            <p className="text-sm text-muted-foreground">Total submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{metrics.pendingReviews}</div>
            <p className="text-sm text-muted-foreground">Pending reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
