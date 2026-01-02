import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { 
  FileText, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Download,
  RotateCcw,
  CheckSquare
} from 'lucide-react';

export function VersionControl() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('student');

  const [versionHistory, setVersionHistory] = useState([
    {
      id: 'v1',
      version: '1.0',
      submittedBy: 'John Doe',
      submittedDate: '2025-12-10 10:30 AM',
      status: 'reviewed',
      adviserComments: 'Good start, but needs more detail in the methodology section.',
      fileName: 'Capstone_Proposal_v1.pdf',
      reviewedBy: 'Dr. Smith',
      reviewedDate: '2025-12-11 02:15 PM'
    },
    {
      id: 'v2',
      version: '2.0',
      submittedBy: 'John Doe',
      submittedDate: '2025-12-13 03:45 PM',
      status: 'approved',
      adviserComments: 'Excellent improvements! Approved.',
      fileName: 'Capstone_Proposal_v2.pdf',
      reviewedBy: 'Dr. Smith',
      reviewedDate: '2025-12-14 11:20 AM'
    },
    {
      id: 'v3',
      version: '3.0',
      submittedBy: 'John Doe',
      submittedDate: '2025-12-16 09:00 AM',
      status: 'pending',
      adviserComments: null,
      fileName: 'Capstone_Proposal_v3.pdf',
      reviewedBy: null,
      reviewedDate: null
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'reviewed':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'reviewed':
        return <AlertCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploading file:', file.name);
      setIsUploadModalOpen(false);
    }
  };

  const handleApproveVersion = (versionId) => {
    console.log('Approving version:', versionId);
    setVersionHistory(prev =>
      prev.map(v =>
        v.id === versionId
          ? { ...v, status: 'approved', reviewedBy: 'Dr. Smith', reviewedDate: new Date().toLocaleString() }
          : v
      )
    );
  };

  const handleRejectVersion = (versionId) => {
    console.log('Rejecting version:', versionId);
    setVersionHistory(prev =>
      prev.map(v =>
        v.id === versionId
          ? { ...v, status: 'reviewed', reviewedBy: 'Dr. Smith', reviewedDate: new Date().toLocaleString() }
          : v
      )
    );
  };

  const handleRestoreVersion = (versionId) => {
    console.log('Restoring version:', versionId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800020]">Version Control & Feedback</h1>
          <p className="text-muted-foreground">Track document submissions and review history</p>
        </div>
        {userRole === 'student' && (
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#800020] hover:bg-[#9B1B30]"
          >
            <Upload className="w-4 h-4 mr-2" />
            Submit New Version
          </Button>
        )}
      </div>

      {/* Role Switcher (for demo purposes) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Demo: Switch View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={userRole === 'student' ? 'default' : 'outline'}
              onClick={() => setUserRole('student')}
              className={userRole === 'student' ? 'bg-[#800020] hover:bg-[#9B1B30]' : ''}
            >
              Student View
            </Button>
            <Button
              size="sm"
              variant={userRole === 'adviser' ? 'default' : 'outline'}
              onClick={() => setUserRole('adviser')}
              className={userRole === 'adviser' ? 'bg-[#800020] hover:bg-[#9B1B30]' : ''}
            >
              Adviser View
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Version History Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#800020]" />
                Version History
              </CardTitle>
              <CardDescription>Timestamped archive of submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {versionHistory.map((version) => (
                <div
                  key={version.id}
                  onClick={() => setSelectedVersion(version)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-[#800020] ${
                    selectedVersion?.id === version.id ? 'border-[#800020] bg-[#800020]/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#800020]">Version {version.version}</span>
                      <Badge className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                    </div>
                    {getStatusIcon(version.status)}
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {version.submittedDate}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {version.submittedBy}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground truncate">
                      {version.fileName}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Version Details and Actions */}
        <div className="lg:col-span-2">
          {selectedVersion ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Version {selectedVersion.version} Details</CardTitle>
                    <CardDescription>{selectedVersion.fileName}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(selectedVersion.status)} text-white`}>
                    {selectedVersion.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Submission Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Submitted By</p>
                    <p className="font-semibold">{selectedVersion.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Submitted Date</p>
                    <p className="font-semibold">{selectedVersion.submittedDate}</p>
                  </div>
                  {selectedVersion.reviewedBy && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reviewed By</p>
                        <p className="font-semibold">{selectedVersion.reviewedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reviewed Date</p>
                        <p className="font-semibold">{selectedVersion.reviewedDate}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Adviser Comments */}
                {selectedVersion.adviserComments && (
                  <div className="p-4 border-l-4 border-[#FFD700] bg-[#FFD700]/10 rounded">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#800020]" />
                      Adviser Feedback
                    </h4>
                    <p className="text-sm">{selectedVersion.adviserComments}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Document
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {userRole === 'adviser' && selectedVersion.status === 'pending' && (
                      <>
                        <Button 
                          onClick={() => handleApproveVersion(selectedVersion.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleRejectVersion(selectedVersion.id)}
                          variant="destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Request Revision
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Restore/Rollback Button */}
                  {selectedVersion.status !== 'pending' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">
                        Restore this version as the current working copy
                      </p>
                      <Button 
                        onClick={() => handleRestoreVersion(selectedVersion.id)}
                        variant="outline"
                        className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restore Version {selectedVersion.version}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  Select a version from history to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit New Version</DialogTitle>
            <DialogDescription>
              Upload your updated document for review
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUploadModalOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
