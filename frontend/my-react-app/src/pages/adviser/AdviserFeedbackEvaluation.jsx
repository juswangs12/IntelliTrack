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
  CheckCircle
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
      // TODO: API call to save comment
    }
  };

  const handleResolveComment = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, resolved: true } : c
    ));
    // TODO: API call to mark comment as resolved
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
    // TODO: API call to delete comment
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
    // TODO: API call to save evaluation
  };

  const handleSubmitEvaluation = () => {
    console.log('Submitting evaluation:', { rubrics, comments });
    // TODO: API call to submit final evaluation
  };

  const handleTriggerRevision = () => {
    console.log('Triggering revision request');
    // TODO: API call to trigger revision
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
              <CardDescription>Submitted by John Doe on Dec 16, 2025</CardDescription>
            </div>
            <Badge className="bg-blue-500">Under Review</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Viewer (Left/Center) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Interactive Document Viewer */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#800020]" />
                  Document Viewer
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">Page {selectedPage}</Button>
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
              {/* Document Preview Area */}
              <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/20 h-[600px] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Document preview will appear here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Integration with PDF viewer or document renderer
                    </p>
                  </div>
                </div>

                {/* Inline Comments Markers (positioned absolutely) */}
                {comments
                  .filter(c => c.page === selectedPage && !c.resolved)
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="absolute w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform"
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
                  <Label htmlFor="newComment" className="mb-2 block">New Comment</Label>
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

          {/* Inline Comments List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inline Comments ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet. Click "Add Comment" to provide feedback.
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 border rounded-lg ${comment.resolved ? 'bg-muted/50 opacity-60' : 'bg-background'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Page {comment.page}</Badge>
                        {comment.resolved && (
                          <Badge className="bg-green-500">
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
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteComment(comment.id)}
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
            </CardContent>
          </Card>
        </div>

        {/* Rubrics Evaluation Panel (Right) */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFD700]" />
                Rubrics Evaluation
              </CardTitle>
              <CardDescription>
                Score: {totalScore} / {totalMaxScore} ({((totalScore / totalMaxScore) * 100).toFixed(1)}%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rubrics.map((rubric) => (
                <div key={rubric.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#800020]">{rubric.category}</h4>
                      <p className="text-xs text-muted-foreground">{rubric.criteria}</p>
                    </div>
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

                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#800020] h-2 rounded-full transition-all"
                      style={{ width: `${(rubric.score / rubric.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}

              {/* Overall Score */}
              <div className="p-4 bg-[#800020] text-white rounded-lg">
                <div className="text-center">
                  <p className="text-sm opacity-90">Overall Score</p>
                  <p className="text-3xl font-bold">{totalScore}</p>
                  <p className="text-sm opacity-90">out of {totalMaxScore}</p>
                  <div className="mt-2 text-lg font-semibold">
                    {((totalScore / totalMaxScore) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Revision Trigger */}
              <div className="pt-4 border-t space-y-2">
                <Button 
                  onClick={handleTriggerRevision} 
                  variant="destructive"
                  className="w-full"
                >
                  Request Revision
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Student will be notified to make corrections
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
