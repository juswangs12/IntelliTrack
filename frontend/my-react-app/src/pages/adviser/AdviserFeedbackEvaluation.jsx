import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  FileText, 
  MessageSquare, 
  Save, 
  Send,
  Plus,
  X,
  Star,
  CheckCircle,
  Minimize2,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function AdviserFeedbackEvaluation() {
  const [comments, setComments] = useState([
    {
      id: 1,
      page: 3,
      position: { x: 150, y: 200 },
      text: 'Need more citations here',
      author: 'Dr. Smith',
      timestamp: '2025-12-16 10:30 AM',
      resolved: false
    },
    {
      id: 2,
      page: 5,
      position: { x: 300, y: 400 },
      text: 'Excellent analysis!',
      author: 'Dr. Smith',
      timestamp: '2025-12-16 10:45 AM',
      resolved: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isFeedbackMinimized, setIsFeedbackMinimized] = useState(false);
  const [totalPages] = useState(10);

  // Rubrics evaluation state
  const [rubrics, setRubrics] = useState([
    {
      id: 1,
      category: 'Content Quality',
      criteria: 'Depth and accuracy of research',
      maxScore: 25,
      score: 0,
      comments: ''
    },
    {
      id: 2,
      category: 'Methodology',
      criteria: 'Appropriateness and clarity of methods',
      maxScore: 20,
      score: 0,
      comments: ''
    },
    {
      id: 3,
      category: 'Organization',
      criteria: 'Logical flow and structure',
      maxScore: 15,
      score: 0,
      comments: ''
    },
    {
      id: 4,
      category: 'Writing Quality',
      criteria: 'Grammar, clarity, and style',
      maxScore: 15,
      score: 0,
      comments: ''
    },
    {
      id: 5,
      category: 'Citations',
      criteria: 'Proper use and formatting of sources',
      maxScore: 15,
      score: 0,
      comments: ''
    },
    {
      id: 6,
      category: 'Innovation',
      criteria: 'Originality and contribution',
      maxScore: 10,
      score: 0,
      comments: ''
    }
  ]);

  const totalMaxScore = rubrics.reduce((sum, rubric) => sum + rubric.maxScore, 0);
  const totalScore = rubrics.reduce((sum, rubric) => sum + rubric.score, 0);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        page: selectedPage,
        position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
        text: newComment,
        author: 'Dr. Smith',
        timestamp: new Date().toLocaleString(),
        resolved: false
      };
      setComments([...comments, comment]);
      setNewComment('');
      setIsAddingComment(false);
    }
  };

  const handleResolveComment = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, resolved: true } : c
    ));
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const handleRubricScoreChange = (rubricId, score) => {
    setRubrics(rubrics.map(r => 
      r.id === rubricId ? { ...r, score: Math.min(Math.max(0, parseInt(score) || 0), r.maxScore) } : r
    ));
  };

  const handleRubricCommentChange = (rubricId, comment) => {
    setRubrics(rubrics.map(r => 
      r.id === rubricId ? { ...r, comments: comment } : r
    ));
  };

  const handleSaveEvaluation = () => {
    console.log('Saving evaluation:', { rubrics, comments });
  };

  const handleSubmitEvaluation = () => {
    console.log('Submitting evaluation:', { rubrics, comments });
  };

  const handleTriggerRevision = () => {
    console.log('Triggering revision request');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800020]">Adviser Feedback & Evaluation</h1>
          <p className="text-muted-foreground">Review document and provide detailed evaluation</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveEvaluation} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmitEvaluation} className="bg-[#800020] hover:bg-[#9B1B30]">
            <Send className="w-4 h-4 mr-2" />
            Submit Evaluation
          </Button>
        </div>
      </div>

      {/* Current Document Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Capstone Proposal - Version 3.0</CardTitle>
              <CardDescription>Submitted by Team Alpha on Dec 16, 2025</CardDescription>
            </div>
            <Badge className="bg-blue-500">Under Review</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Document Viewer with Floating Feedback Panel */}
      <div className="relative">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#800020]" />
                Document Viewer
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedPage(Math.max(1, selectedPage - 1))}
                  disabled={selectedPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm px-2">Page {selectedPage} / {totalPages}</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedPage(Math.min(totalPages, selectedPage + 1))}
                  disabled={selectedPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setIsAddingComment(!isAddingComment)}
                  className={isAddingComment ? 'bg-[#800020] text-white' : ''}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Document Preview Area with enhanced viewer */}
            <div className="relative border-2 border-muted rounded-lg bg-white h-[700px] overflow-auto">
              <div className="p-8">
                {/* Simulated document content */}
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-2xl font-bold text-[#800020]">Capstone Project Proposal</h2>
                  <h3 className="text-xl font-semibold">Page {selectedPage}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This is a sample document viewer showing page {selectedPage} of the capstone proposal. 
                    In a production environment, this would integrate with a PDF viewer library (such as 
                    react-pdf or pdf.js) to display actual document content.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The document viewer supports inline commenting, allowing advisers to provide specific 
                    feedback on particular sections of the document. Comments can be added by clicking the 
                    "Add Comment" button above.
                  </p>
                  <div className="border-l-4 border-[#FFD700] pl-4 my-4 bg-yellow-50 p-3">
                    <p className="text-gray-700">
                      <strong>Sample Content Section:</strong> This area demonstrates where student content 
                      would appear. The adviser can read through the document and provide feedback using the 
                      floating feedback panel on the right.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Additional content for page {selectedPage} continues here. The document viewer maintains 
                    scroll position and allows navigation between pages using the controls above.
                  </p>
                </div>
              </div>

              {/* Inline Comments Markers (positioned absolutely) */}
              {comments
                .filter(c => c.page === selectedPage && !c.resolved)
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="absolute w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform border-2 border-[#800020]"
                    style={{
                      left: `${comment.position.x}px`,
                      top: `${comment.position.y}px`
                    }}
                    title={comment.text}
                  >
                    <MessageSquare className="w-4 h-4 text-[#800020]" />
                  </div>
                ))}
            </div>

            {/* Add Comment Form */}
            {isAddingComment && (
              <div className="mt-4 p-4 border rounded-lg bg-background">
                <Label htmlFor="newComment" className="mb-2 block">New Comment for Page {selectedPage}</Label>
                <Input
                  id="newComment"
                  placeholder="Enter your feedback here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddComment} size="sm" className="bg-[#800020] hover:bg-[#9B1B30]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button onClick={() => setIsAddingComment(false)} size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Floating Feedback Panel */}
        <div 
          className={`fixed right-6 transition-all duration-300 ease-in-out ${
            isFeedbackMinimized ? 'bottom-6 w-64' : 'top-32 bottom-6 w-96'
          }`}
          style={{ zIndex: 50 }}
        >
          <Card className="h-full shadow-2xl border-2 border-[#800020]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#800020]" />
                  {isFeedbackMinimized ? 'Comments' : 'Feedback & Comments'}
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFeedbackMinimized(!isFeedbackMinimized)}
                >
                  {isFeedbackMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {!isFeedbackMinimized && (
                <CardDescription>
                  {comments.length} total comment{comments.length !== 1 ? 's' : ''} • {comments.filter(c => !c.resolved).length} active
                </CardDescription>
              )}
            </CardHeader>
            
            {!isFeedbackMinimized && (
              <CardContent className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 80px)' }}>
                <div className="space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No comments yet. Click "Add Comment" to provide feedback.
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 border rounded-lg transition-all hover:shadow-md ${
                          comment.resolved ? 'bg-muted/50 opacity-60' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Page {comment.page}
                            </Badge>
                            {comment.resolved && (
                              <Badge className="bg-green-500 text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {!comment.resolved && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleResolveComment(comment.id)}
                                className="h-6 w-6 p-0"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteComment(comment.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{comment.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {comment.author} • {comment.timestamp}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Rubrics Evaluation Section (moved below) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFD700]" />
                Rubrics Evaluation
              </CardTitle>
              <CardDescription>
                Score: {totalScore} / {totalMaxScore} ({((totalScore / totalMaxScore) * 100).toFixed(1)}%)
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#800020]">{totalScore}</div>
              <div className="text-sm text-muted-foreground">out of {totalMaxScore}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rubrics.map((rubric) => (
              <div key={rubric.id} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
                <div>
                  <h4 className="font-semibold text-sm text-[#800020]">{rubric.category}</h4>
                  <p className="text-xs text-muted-foreground">{rubric.criteria}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max={rubric.maxScore}
                    value={rubric.score}
                    onChange={(e) => handleRubricScoreChange(rubric.id, e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">/ {rubric.maxScore}</span>
                </div>

                <Input
                  placeholder="Comments..."
                  value={rubric.comments}
                  onChange={(e) => handleRubricCommentChange(rubric.id, e.target.value)}
                  className="text-sm"
                />

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-[#800020] h-2 rounded-full transition-all"
                    style={{ width: `${(rubric.score / rubric.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between p-6 bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-lg">
            <div>
              <p className="text-sm opacity-90">Overall Score</p>
              <p className="text-4xl font-bold">{totalScore} / {totalMaxScore}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Percentage</p>
              <p className="text-4xl font-bold">{((totalScore / totalMaxScore) * 100).toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button 
              onClick={handleTriggerRevision} 
              variant="destructive"
              className="flex-1"
            >
              Request Revision
            </Button>
            <Button 
              onClick={handleSubmitEvaluation} 
              className="flex-1 bg-[#800020] hover:bg-[#9B1B30]"
            >
              <Send className="w-4 h-4 mr-2" />
              Approve & Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
