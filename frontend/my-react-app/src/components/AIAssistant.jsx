import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, ExternalLink, Calendar, FileText } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AI Assistant. I can help you with:\n\n• Deadline information\n• Document requirements\n• Submission templates\n• Timeline queries\n\nTry asking "When is the deadline for Chapter 3?" or "Show me requirements for final defense"',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const deadlineDatabase = {
    'chapter 1': {
      deadline: 'January 15, 2026',
      daysLeft: 10,
      templateLink: '/templates/chapter-1.docx',
      requirements: ['Introduction', 'Background of the Study', 'Statement of the Problem', 'Objectives', 'Scope and Limitations']
    },
    'chapter 2': {
      deadline: 'February 10, 2026',
      daysLeft: 36,
      templateLink: '/templates/chapter-2.docx',
      requirements: ['Review of Related Literature', 'Theoretical Framework', 'Conceptual Framework']
    },
    'chapter 3': {
      deadline: 'March 5, 2026',
      daysLeft: 59,
      templateLink: '/templates/chapter-3.docx',
      requirements: ['Research Methodology', 'Research Design', 'Data Collection', 'Data Analysis']
    },
    'chapter 4': {
      deadline: 'April 20, 2026',
      daysLeft: 105,
      templateLink: '/templates/chapter-4.docx',
      requirements: ['Presentation of Data', 'Analysis and Interpretation', 'Discussion of Findings']
    },
    'chapter 5': {
      deadline: 'May 15, 2026',
      daysLeft: 130,
      templateLink: '/templates/chapter-5.docx',
      requirements: ['Summary', 'Conclusions', 'Recommendations', 'Future Work']
    },
    'proposal defense': {
      deadline: 'February 28, 2026',
      daysLeft: 54,
      templateLink: '/templates/proposal-defense.pptx',
      requirements: ['PowerPoint Presentation', 'Chapters 1-3 Completed', 'Working Prototype (if applicable)']
    },
    'midterm defense': {
      deadline: 'April 10, 2026',
      daysLeft: 95,
      templateLink: '/templates/midterm-defense.pptx',
      requirements: ['Progress Presentation', 'Chapters 1-4 Completed', '60% System Development']
    },
    'final defense': {
      deadline: 'May 30, 2026',
      daysLeft: 145,
      templateLink: '/templates/final-defense.pptx',
      requirements: ['Complete Documentation', 'Fully Functional System', 'Final Presentation', 'Published Paper (optional)']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Pattern matching for deadline queries
    const deadlinePatterns = [
      /when is (?:the )?deadline (?:for|of) (.+)/i,
      /(.+) deadline/i,
      /deadline (?:for|of) (.+)/i,
      /when (?:is|do) (?:i|we) (?:need to )?submit (.+)/i,
      /(.+) due date/i,
      /when (?:is|are) (.+) due/i
    ];

    let deliverable = null;
    for (const pattern of deadlinePatterns) {
      const match = lowerMessage.match(pattern);
      if (match) {
        deliverable = match[1].trim();
        break;
      }
    }

    if (deliverable) {
      // Search for matching deliverable in database
      const matchedKey = Object.keys(deadlineDatabase).find(key =>
        deliverable.includes(key) || key.includes(deliverable)
      );

      if (matchedKey) {
        const info = deadlineDatabase[matchedKey];
        const isUrgent = info.daysLeft <= 7;
        const isWarning = info.daysLeft <= 14 && info.daysLeft > 7;

        return {
          type: 'deadline-info',
          deliverable: matchedKey,
          data: info,
          message: `📅 **${matchedKey.toUpperCase()}**\n\n` +
                   `**Deadline:** ${info.deadline}\n` +
                   `**Days Remaining:** ${info.daysLeft} days\n` +
                   `**Status:** ${isUrgent ? '🔴 Urgent' : isWarning ? '🟡 Upcoming Soon' : '🟢 Sufficient Time'}\n\n` +
                   `**Requirements:**\n${info.requirements.map(r => `• ${r}`).join('\n')}\n\n` +
                   `Would you like me to provide the submission template?`
        };
      }
    }

    // Pattern matching for template requests
    if (lowerMessage.includes('template') || lowerMessage.includes('format') || lowerMessage.includes('download')) {
      const matchedKey = Object.keys(deadlineDatabase).find(key => lowerMessage.includes(key));
      if (matchedKey) {
        const info = deadlineDatabase[matchedKey];
        return {
          type: 'template-link',
          message: `Here's the template for **${matchedKey}**:`,
          link: info.templateLink,
          linkLabel: `Download ${matchedKey} Template`
        };
      }
    }

    // Pattern matching for requirement queries
    if (lowerMessage.includes('requirement') || lowerMessage.includes('need') || lowerMessage.includes('include')) {
      const matchedKey = Object.keys(deadlineDatabase).find(key => lowerMessage.includes(key));
      if (matchedKey) {
        const info = deadlineDatabase[matchedKey];
        return {
          type: 'requirements',
          message: `**Requirements for ${matchedKey.toUpperCase()}:**\n\n${info.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nMake sure all requirements are met before submission!`
        };
      }
    }

    // Show all deadlines
    if (lowerMessage.includes('all deadline') || lowerMessage.includes('show deadline') || lowerMessage.includes('list deadline')) {
      const sortedDeadlines = Object.entries(deadlineDatabase)
        .sort((a, b) => a[1].daysLeft - b[1].daysLeft)
        .slice(0, 5);

      return {
        type: 'all-deadlines',
        message: `**Upcoming Deadlines:**\n\n${sortedDeadlines.map(([key, info]) => 
          `📅 **${key}**\n   ${info.deadline} (${info.daysLeft} days left)`
        ).join('\n\n')}\n\nAsk about any specific deadline for more details!`
      };
    }

    // Help/guidance queries
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what can you')) {
      return {
        type: 'help',
        message: `I can help you with:\n\n` +
                 `📅 **Deadline Information**\n` +
                 `   Ask: "When is the deadline for Chapter 3?"\n\n` +
                 `📄 **Templates**\n` +
                 `   Ask: "Show me the template for proposal defense"\n\n` +
                 `📋 **Requirements**\n` +
                 `   Ask: "What are the requirements for final defense?"\n\n` +
                 `📊 **All Deadlines**\n` +
                 `   Ask: "Show all deadlines"\n\n` +
                 `Try asking a question!`
      };
    }

    // Default response for unmatched queries
    return {
      type: 'general',
      message: `I'm not sure about that specific query. Here's what I can help you with:\n\n` +
               `• Ask about deadline dates (e.g., "When is Chapter 3 due?")\n` +
               `• Request submission templates\n` +
               `• Check requirements for deliverables\n` +
               `• View all upcoming deadlines\n\n` +
               `Try rephrasing your question or ask "help" for more guidance.`
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        ...aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #800020 0%, #a00030 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(128, 0, 32, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(128, 0, 32, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 32, 0.3)';
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" style={{ color: 'white' }} />
        ) : (
          <MessageCircle className="w-6 h-6" style={{ color: 'white' }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          width: '400px',
          height: '600px',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #800020 0%, #a00030 100%)',
            color: 'white',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot className="w-5 h-5" style={{ color: '#800020' }} />
              </div>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.125rem' }}>
                  AI Assistant
                </h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Online • Ready to help
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            background: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'start',
                  flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: msg.type === 'user' ? '#FFD700' : '#800020',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.type === 'user' ? (
                    <User className="w-4 h-4" style={{ color: '#800020' }} />
                  ) : (
                    <Bot className="w-4 h-4" style={{ color: 'white' }} />
                  )}
                </div>

                {/* Message Bubble */}
                <div style={{
                  maxWidth: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: msg.type === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                    background: msg.type === 'user' ? '#800020' : 'white',
                    color: msg.type === 'user' ? 'white' : '#111827',
                    boxShadow: msg.type === 'user' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.message}

                    {/* Template Link Button */}
                    {msg.link && (
                      <a
                        href={msg.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginTop: '0.75rem',
                          padding: '0.5rem 0.75rem',
                          background: '#800020',
                          color: 'white',
                          borderRadius: '0.5rem',
                          textDecoration: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        <FileText className="w-4 h-4" />
                        {msg.linkLabel || 'Download Template'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.65rem',
                    color: '#9ca3af',
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    paddingLeft: msg.type === 'user' ? 0 : '0.5rem',
                    paddingRight: msg.type === 'user' ? '0.5rem' : 0
                  }}>
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: '#800020',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot className="w-4 h-4" style={{ color: 'white' }} />
                </div>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem 1rem 1rem 0',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#d1d5db', animation: 'bounce 1.4s infinite' }} />
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#d1d5db', animation: 'bounce 1.4s infinite 0.2s' }} />
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#d1d5db', animation: 'bounce 1.4s infinite 0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            background: 'white'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Ask about deadlines, templates, requirements..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  padding: '0.75rem',
                  background: inputMessage.trim() ? '#800020' : '#e5e7eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
