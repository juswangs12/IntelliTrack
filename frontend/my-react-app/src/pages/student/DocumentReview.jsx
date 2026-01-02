import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  FileText, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Send,
  Download,
  Eye,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export function DocumentReview() {
  const [currentDocument] = useState({
    id: 1,
    title: 'Capstone Project Proposal - Team Alpha',
    student: 'John Doe',
    studentId: '2021-12345',
    team: 'Team Alpha',
    submittedDate: '2025-12-15 02:30 PM',
    version: '3.0',
    status: 'under_review',
    fileUrl: '#',
    pageCount: 25
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewer: 'Dr. Jane Smith',
      role: 'Adviser',
      date: '2025-12-16 10:30 AM',
      status: 'approved',
      overallScore: 85,
      comment: 'Excellent work on the methodology section. The research design is well-structured and clearly explained. Minor revisions needed in the literature review.',
      sections: [
        { name: 'Introduction', score: 90, comment: 'Clear and concise' },
        { name: 'Literature Review', score: 75, comment: 'Needs more recent sources' },
        { name: 'Methodology', score: 95, comment: 'Very thorough' },
        { name: 'Expected Results', score: 80, comment: 'Good projections' }
      ]
    },
    {
      id: 2,
      reviewer: 'Prof. Michael Chen',
      role: 'Panel Member',
      date: '2025-12-16 03:45 PM',
      status: 'revision_requested',
      overallScore: 78,
      comment: 'The technical approach is solid but needs more detail on implementation timeline. Please expand on the testing strategy.',
      sections: [
        { name: 'Introduction', score: 85, comment: 'Well written' },
        { name: 'Literature Review', score: 80, comment: 'Comprehensive' },
        { name: 'Methodology', score: 70, comment: 'Timeline needs clarification' },
        { name: 'Expected Results', score: 75, comment: 'Add more metrics' }
      ]
    }
  ]);

  const [newReview, setNewReview] = useState({
    overallScore: 0,
    comment: '',
    sections: [
      { name: 'Introduction', score: 0, comment: '' },
      { name: 'Literature Review', score: 0, comment: '' },
      { name: 'Methodology', score: 0, comment: '' },
      { name: 'Expected Results', score: 0, comment: '' }
    ]
  });

  const [isReviewing, setIsReviewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSectionScoreChange = (index, score) => {
    const updatedSections = [...newReview.sections];
    updatedSections[index].score = Math.min(Math.max(0, parseInt(score) || 0), 100);
    
    // Auto-calculate overall score
    const avgScore = Math.round(
      updatedSections.reduce((sum, section) => sum + section.score, 0) / updatedSections.length
    );
    
    setNewReview({
      ...newReview,
      sections: updatedSections,
      overallScore: avgScore
    });
  };

  const handleSectionCommentChange = (index, comment) => {
    const updatedSections = [...newReview.sections];
    updatedSections[index].comment = comment;
    setNewReview({
      ...newReview,
      sections: updatedSections
    });
  };

  const handleSubmitReview = (status) => {
    const review = {
      id: reviews.length + 1,
      reviewer: 'Dr. Current User',
      role: 'Adviser',
      date: new Date().toLocaleString(),
      status: status,
      overallScore: newReview.overallScore,
      comment: newReview.comment,
      sections: newReview.sections
    };

    setReviews([...reviews, review]);
    
    // Reset form
    setNewReview({
      overallScore: 0,
      comment: '',
      sections: [
        { name: 'Introduction', score: 0, comment: '' },
        { name: 'Literature Review', score: 0, comment: '' },
        { name: 'Methodology', score: 0, comment: '' },
        { name: 'Expected Results', score: 0, comment: '' }
      ]
    });
    setIsReviewing(false);

    alert(`Review submitted successfully with status: ${status}`);
  };

  const getStatusBadge = (status) => {
    const configs = {
      approved: { color: 'bg-green-500', icon: CheckCircle, label: 'Approved' },
      revision_requested: { color: 'bg-yellow-500', icon: AlertCircle, label: 'Revision Requested' },
      rejected: { color: 'bg-red-500', icon: ThumbsDown, label: 'Rejected' },
      under_review: { color: 'bg-blue-500', icon: Clock, label: 'Under Review' }
    };
    const config = configs[status] || configs.under_review;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800020]">Document Review</h1>
          <p className="text-muted-foreground">Review and evaluate student submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          {!isReviewing && (
            <Button 
              onClick={() => setIsReviewing(true)}
              className="bg-[#800020] hover:bg-[#9B1B30]"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          )}
        </div>
      </div>

      {/* Document Information */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{currentDocument.title}</CardTitle>
              <CardDescription className="mt-2 space-y-1">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {currentDocument.student} ({currentDocument.studentId})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Submitted: {currentDocument.submittedDate}
                  </span>
                  <Badge variant="outline">Version {currentDocument.version}</Badge>
                </div>
              </CardDescription>
            </div>
            <div className="text-right">
              {getStatusBadge(currentDocument.status)}
              <div className="mt-2 text-sm text-muted-foreground">
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#800020]" />
                  Document Preview
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm px-3">
                    Page {currentPage} / {currentDocument.pageCount}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(currentDocument.pageCount, currentPage + 1))}
                    disabled={currentPage === currentDocument.pageCount}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Interactive Document Viewer */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg bg-white h-[700px] overflow-auto p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Simulated Document Content */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#800020] mb-2">
                      {currentDocument.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {currentDocument.team} • {currentDocument.student}
                    </p>
                  </div>

                  {currentPage === 1 && (
                    <>
                      <section>
                        <h3 className="text-xl font-semibold text-[#800020] mb-3">1. Introduction</h3>
                        <p className="text-sm leading-relaxed mb-4">
                          This capstone project aims to develop an intelligent tracking system for managing 
                          capstone deliverables in academic institutions. The system will provide real-time 
                          monitoring, version control, and collaborative features for students, advisers, and 
                          administrators.
                        </p>
                        <p className="text-sm leading-relaxed">
                          The current manual process of tracking submissions, providing feedback, and managing 
                          revisions is time-consuming and prone to errors. Our proposed solution leverages 
                          modern web technologies to streamline these processes and improve overall efficiency.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-[#800020] mb-3">2. Problem Statement</h3>
                        <p className="text-sm leading-relaxed mb-4">
                          Academic institutions face significant challenges in managing capstone projects, 
                          including difficulty in tracking multiple submissions, providing timely feedback, 
                          and maintaining version history. Students often struggle with understanding 
                          requirements and tracking their progress.
                        </p>
                      </section>
                    </>
                  )}

                  {currentPage === 2 && (
                    <>
                      <section>
                        <h3 className="text-xl font-semibold text-[#800020] mb-3">3. Literature Review</h3>
                        <p className="text-sm leading-relaxed mb-4">
                          Recent studies have shown that digital project management systems significantly 
                          improve student outcomes and reduce administrative burden (Smith et al., 2024). 
                          According to Johnson (2023), real-time collaboration features enhance the quality 
                          of feedback between advisers and students.
                        </p>
                        <p className="text-sm leading-relaxed">
                          Research by Chen and Williams (2024) demonstrates that version control systems 
                          help students understand the iterative nature of academic work and improve their 
                          final deliverables.
                        </p>
                      </section>
                    </>
                  )}

                  {currentPage >= 3 && (
                    <>
                      <section>
                        <h3 className="text-xl font-semibold text-[#800020] mb-3">4. Methodology</h3>
                        <p className="text-sm leading-relaxed mb-4">
                          Our approach combines agile development methodologies with user-centered design 
                          principles. The system will be developed using React for the frontend and Spring 
                          Boot for the backend, ensuring scalability and maintainability.
                        </p>
                        <p className="text-sm leading-relaxed">
                          We will conduct user testing with students and faculty throughout the development 
                          process to ensure the system meets their needs and expectations.
                        </p>
                      </section>
                    </>
                  )}

                  <div className="text-center text-xs text-muted-foreground mt-8 pt-4 border-t">
                    Page {currentPage} of {currentDocument.pageCount}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* New Review Form */}
          {isReviewing && (
            <Card className="border-[#800020]">
              <CardHeader>
                <CardTitle className="text-lg text-[#800020]">Submit Review</CardTitle>
                <CardDescription>Provide detailed feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Section Scores */}
                {newReview.sections.map((section, index) => (
                  <div key={index} className="space-y-2 pb-3 border-b last:border-0">
                    <Label className="text-sm font-semibold">{section.name}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={section.score}
                        onChange={(e) => handleSectionScoreChange(index, e.target.value)}
                        className="w-20"
                        placeholder="0"
                      />
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </div>
                    <Input
                      placeholder="Section comment..."
                      value={section.comment}
                      onChange={(e) => handleSectionCommentChange(index, e.target.value)}
                      className="text-sm"
                    />
                  </div>
                ))}

                {/* Overall Score */}
                <div className="p-3 bg-[#800020] text-white rounded-lg text-center">
                  <p className="text-sm opacity-90">Overall Score</p>
                  <p className="text-3xl font-bold">{newReview.overallScore}</p>
                  <p className="text-xs opacity-75">out of 100</p>
                </div>

                {/* Overall Comment */}
                <div className="space-y-2">
                  <Label>Overall Comment</Label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 text-sm border rounded-md"
                    placeholder="Provide overall feedback..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Button 
                    onClick={() => handleSubmitReview('approved')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleSubmitReview('revision_requested')}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Request Revision
                  </Button>
                  <Button 
                    onClick={() => handleSubmitReview('rejected')}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => setIsReviewing(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                    {getStatusBadge(review.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Score:</span>
                    <span className="text-2xl font-bold text-[#800020]">{review.overallScore}</span>
                  </div>

                  <div className="space-y-2">
                    {review.sections.map((section, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{section.name}</span>
                          <span className="text-[#800020]">{section.score}/100</span>
                        </div>
                        {section.comment && (
                          <p className="text-muted-foreground italic">{section.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm">{review.comment}</p>
                  </div>

                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
