import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, MessageSquare, CheckCircle, X, Save, Send, Download, Eye, Minimize2, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DocumentReview() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFeedbackMinimized, setIsFeedbackMinimized] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('pending');
  const [comments, setComments] = useState([
    { id: 1, page: 1, text: 'Good introduction', position: { top: '15%', left: '10%' } },
    { id: 2, page: 2, text: 'Need more references', position: { top: '40%', left: '15%' } },
    { id: 3, page: 3, text: 'Methodology is clear', position: { top: '25%', left: '20%' } }
  ]);
  const [scores, setScores] = useState({
    content: 0,
    organization: 0,
    grammar: 0,
    formatting: 0,
    references: 0
  });

  const totalPages = 10;
  
  // Mock document submission data
  const submission = {
    teamName: 'Team Alpha',
    document: 'Chapter 3 - Methodology',
    submittedOn: 'December 28, 2025',
    members: ['Juan Dela Cruz', 'Maria Santos', 'Pedro Garcia'],
    adviser: 'Dr. Maria Garcia'
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSubmitReview = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    alert(`Review submitted!\nTotal Score: ${totalScore}/100\nStatus: ${status}`);
    navigate('/coordinator/home');
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const getCommentsForPage = (page) => {
    return comments.filter(c => c.page === page);
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h1 className="page-title">Document Review</h1>
            <p className="page-description">
              {submission.teamName} - {submission.document}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/coordinator/home')}>
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button className="btn btn-secondary" onClick={handleSaveDraft}>
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button className="btn btn-primary" onClick={handleSubmitReview}>
              <Send className="w-4 h-4" />
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* Submission Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Team</p>
              <p style={{ fontWeight: '600' }}>{submission.teamName}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Document</p>
              <p style={{ fontWeight: '600' }}>{submission.document}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Submitted On</p>
              <p style={{ fontWeight: '600' }}>{submission.submittedOn}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Adviser</p>
              <p style={{ fontWeight: '600' }}>{submission.adviser}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Members</p>
              <p style={{ fontSize: '0.875rem' }}>{submission.members.join(', ')}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Current Score</p>
              <p style={{ fontWeight: '600', fontSize: '1.5rem', color: totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#dc2626' }}>
                {totalScore}/100
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isFeedbackMinimized ? '1fr' : '1fr 450px', gap: '1.5rem' }}>
        {/* Document Viewer */}
        <div className="card" style={{ height: 'calc(100vh - 280px)', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FileText className="w-5 h-5" style={{ color: '#800020' }} />
              <h2 className="card-title">Document Viewer</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}>
                <Download className="w-4 h-4" />
                Download
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', minWidth: '80px', textAlign: 'center' }}>
                  Page {currentPage} / {totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="card-content" style={{ flex: 1, overflow: 'auto', position: 'relative', background: '#f9fafb' }}>
            {/* Document Content Area */}
            <div style={{
              background: 'white',
              minHeight: '100%',
              padding: '3rem 2rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              margin: '1rem auto',
              maxWidth: '800px',
              position: 'relative'
            }}>
              {/* Simulated Document Content */}
              <div style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
                  CHAPTER {currentPage}
                </h1>
                
                {currentPage === 1 && (
                  <>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
                      1.1 Introduction
                    </h2>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      This chapter presents the research methodology used in this study. It includes the research design, 
                      data collection methods, instruments used, and data analysis procedures. The methodology was carefully 
                      designed to address the research objectives outlined in Chapter 1.
                    </p>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      The study employs a mixed-methods approach, combining both quantitative and qualitative research 
                      methods to provide a comprehensive understanding of the research problem. This approach allows for 
                      triangulation of data, enhancing the validity and reliability of the findings.
                    </p>
                  </>
                )}
                
                {currentPage === 2 && (
                  <>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
                      1.2 Research Design
                    </h2>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      The research design for this study is descriptive-correlational, aiming to describe the characteristics 
                      of the variables and examine the relationships between them. This design was chosen because it allows 
                      for the systematic collection and analysis of data while maintaining objectivity.
                    </p>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      The study will be conducted in three phases: preparation, implementation, and evaluation. Each phase 
                      has specific objectives and activities that contribute to the overall success of the research.
                    </p>
                  </>
                )}
                
                {currentPage === 3 && (
                  <>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
                      1.3 Data Collection Methods
                    </h2>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      Data collection will be conducted using multiple methods to ensure comprehensive coverage of the 
                      research objectives. The primary method will be through structured questionnaires distributed to 
                      the target population. Secondary data will be gathered from existing documents and records.
                    </p>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      Additionally, interviews will be conducted with key informants to provide deeper insights into 
                      the research problem. All data collection activities will adhere to ethical guidelines and 
                      principles of informed consent.
                    </p>
                  </>
                )}
                
                {currentPage > 3 && (
                  <>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
                      Section {currentPage}.{currentPage - 1}
                    </h2>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      This section contains detailed information about the research methodology, including specific 
                      procedures, techniques, and analytical frameworks used in the study. The content is structured 
                      to provide clear and comprehensive coverage of all methodological aspects.
                    </p>
                    <p style={{ marginBottom: '1rem', textAlign: 'justify' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </>
                )}
              </div>

              {/* Comment Markers for Current Page */}
              {getCommentsForPage(currentPage).map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    position: 'absolute',
                    ...comment.position,
                    width: '24px',
                    height: '24px',
                    background: '#FFD700',
                    border: '2px solid #800020',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#800020'
                  }}
                  title={comment.text}
                >
                  {comment.id}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Panel */}
        <div 
          className="card" 
          style={{
            height: 'calc(100vh - 280px)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            ...(isFeedbackMinimized && {
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '300px',
              height: 'auto',
              zIndex: 100,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            })
          }}
        >
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MessageSquare className="w-5 h-5" style={{ color: '#800020' }} />
              <h2 className="card-title">Review & Feedback</h2>
            </div>
            <button
              onClick={() => setIsFeedbackMinimized(!isFeedbackMinimized)}
              className="btn btn-secondary"
              style={{ padding: '0.25rem' }}
            >
              {isFeedbackMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>

          {!isFeedbackMinimized && (
            <div className="card-content" style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Status Selection */}
              <div>
                <label className="form-label">Review Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="needs-revision">Needs Revision</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Rubric Scoring */}
              <div>
                <label className="form-label">Evaluation Rubric</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Object.entries({
                    content: 'Content Quality',
                    organization: 'Organization',
                    grammar: 'Grammar & Style',
                    formatting: 'Formatting',
                    references: 'References'
                  }).map(([key, label]) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{label}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#800020' }}>
                          {scores[key]}/20
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={scores[key]}
                        onChange={(e) => setScores({ ...scores, [key]: parseInt(e.target.value) })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1rem', 
                  background: totalScore >= 80 ? '#ecfdf5' : totalScore >= 60 ? '#fef3c7' : '#fee2e2',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Score</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#dc2626' }}>
                    {totalScore}/100
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <label className="form-label">Comments ({comments.length})</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      style={{
                        padding: '0.75rem',
                        background: '#fef3f2',
                        border: '1px solid #fee2e2',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '600', color: '#800020' }}>Page {comment.page}</span>
                        <button
                          onClick={() => setComments(comments.filter(c => c.id !== comment.id))}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <X className="w-4 h-4" style={{ color: '#6b7280' }} />
                        </button>
                      </div>
                      <p style={{ color: '#111827' }}>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Feedback */}
              <div style={{ flex: 1 }}>
                <label className="form-label">General Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback for the team..."
                  className="form-input"
                  rows="6"
                  style={{ resize: 'vertical', minHeight: '150px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
