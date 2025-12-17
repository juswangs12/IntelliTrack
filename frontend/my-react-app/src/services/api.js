import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  validateToken: async () => {
    const response = await apiClient.get('/auth/validate');
    return response.data;
  },
};

// User API
export const userAPI = {
  getAllUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

// Submission API
export const submissionAPI = {
  getAllSubmissions: async () => {
    const response = await apiClient.get('/submissions');
    return response.data;
  },

  getSubmissionById: async (id) => {
    const response = await apiClient.get(`/submissions/${id}`);
    return response.data;
  },

  createSubmission: async (submissionData) => {
    const response = await apiClient.post('/submissions', submissionData);
    return response.data;
  },

  updateSubmission: async (id, submissionData) => {
    const response = await apiClient.put(`/submissions/${id}`, submissionData);
    return response.data;
  },

  deleteSubmission: async (id) => {
    const response = await apiClient.delete(`/submissions/${id}`);
    return response.data;
  },

  getSubmissionsByStudent: async (studentId) => {
    const response = await apiClient.get(`/submissions/student/${studentId}`);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStudentDashboard: async (studentId) => {
    const response = await apiClient.get(`/dashboard/student/${studentId}`);
    return response.data;
  },

  getCoordinatorDashboard: async (coordinatorId) => {
    const response = await apiClient.get(`/dashboard/coordinator/${coordinatorId}`);
    return response.data;
  },

  getAdminDashboard: async () => {
    const response = await apiClient.get('/dashboard/admin');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await apiClient.get('/dashboard/analytics');
    return response.data;
  },
};

// AI API
export const aiAPI = {
  analyzeRisk: async (submissionId) => {
    const response = await apiClient.get(`/ai/risk/${submissionId}`);
    return response.data;
  },

  generateRecommendation: async (data) => {
    const response = await apiClient.post('/ai/recommendation', data);
    return response.data;
  },
};

// Feedback API
export const feedbackAPI = {
  getAllFeedbacks: async () => {
    const response = await apiClient.get('/feedbacks');
    return response.data;
  },

  getFeedbackById: async (id) => {
    const response = await apiClient.get(`/feedbacks/${id}`);
    return response.data;
  },

  createFeedback: async (feedbackData) => {
    const response = await apiClient.post('/feedbacks', feedbackData);
    return response.data;
  },

  updateFeedback: async (id, feedbackData) => {
    const response = await apiClient.put(`/feedbacks/${id}`, feedbackData);
    return response.data;
  },

  deleteFeedback: async (id) => {
    const response = await apiClient.delete(`/feedbacks/${id}`);
    return response.data;
  },
};

// Deadline API
export const deadlineAPI = {
  getAllDeadlines: async () => {
    const response = await apiClient.get('/deadlines');
    return response.data;
  },

  getDeadlineById: async (id) => {
    const response = await apiClient.get(`/deadlines/${id}`);
    return response.data;
  },

  createDeadline: async (deadlineData) => {
    const response = await apiClient.post('/deadlines', deadlineData);
    return response.data;
  },

  updateDeadline: async (id, deadlineData) => {
    const response = await apiClient.put(`/deadlines/${id}`, deadlineData);
    return response.data;
  },

  deleteDeadline: async (id) => {
    const response = await apiClient.delete(`/deadlines/${id}`);
    return response.data;
  },
};

// Document Version API
export const documentVersionAPI = {
  getAllDocumentVersions: async () => {
    const response = await apiClient.get('/document-versions');
    return response.data;
  },

  getDocumentVersionById: async (id) => {
    const response = await apiClient.get(`/document-versions/${id}`);
    return response.data;
  },

  createDocumentVersion: async (versionData) => {
    const response = await apiClient.post('/document-versions', versionData);
    return response.data;
  },

  updateDocumentVersion: async (id, versionData) => {
    const response = await apiClient.put(`/document-versions/${id}`, versionData);
    return response.data;
  },

  deleteDocumentVersion: async (id) => {
    const response = await apiClient.delete(`/document-versions/${id}`);
    return response.data;
  },
};

// Inline Comment API
export const inlineCommentAPI = {
  getAllInlineComments: async () => {
    const response = await apiClient.get('/inline-comments');
    return response.data;
  },

  getInlineCommentById: async (id) => {
    const response = await apiClient.get(`/inline-comments/${id}`);
    return response.data;
  },

  createInlineComment: async (commentData) => {
    const response = await apiClient.post('/inline-comments', commentData);
    return response.data;
  },

  updateInlineComment: async (id, commentData) => {
    const response = await apiClient.put(`/inline-comments/${id}`, commentData);
    return response.data;
  },

  deleteInlineComment: async (id) => {
    const response = await apiClient.delete(`/inline-comments/${id}`);
    return response.data;
  },
};

// Milestone API
export const milestoneAPI = {
  getAllMilestones: async () => {
    const response = await apiClient.get('/milestones');
    return response.data;
  },

  getMilestoneById: async (id) => {
    const response = await apiClient.get(`/milestones/${id}`);
    return response.data;
  },

  createMilestone: async (milestoneData) => {
    const response = await apiClient.post('/milestones', milestoneData);
    return response.data;
  },

  updateMilestone: async (id, milestoneData) => {
    const response = await apiClient.put(`/milestones/${id}`, milestoneData);
    return response.data;
  },

  deleteMilestone: async (id) => {
    const response = await apiClient.delete(`/milestones/${id}`);
    return response.data;
  },
};

// Notification API
export const notificationAPI = {
  getAllNotifications: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  getNotificationById: async (id) => {
    const response = await apiClient.get(`/notifications/${id}`);
    return response.data;
  },

  createNotification: async (notificationData) => {
    const response = await apiClient.post('/notifications', notificationData);
    return response.data;
  },

  updateNotification: async (id, notificationData) => {
    const response = await apiClient.put(`/notifications/${id}`, notificationData);
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  },
};

// Profile API
export const profileAPI = {
  getAllProfiles: async () => {
    const response = await apiClient.get('/profiles');
    return response.data;
  },

  getProfileById: async (id) => {
    const response = await apiClient.get(`/profiles/${id}`);
    return response.data;
  },

  createProfile: async (profileData) => {
    const response = await apiClient.post('/profiles', profileData);
    return response.data;
  },

  updateProfile: async (id, profileData) => {
    const response = await apiClient.put(`/profiles/${id}`, profileData);
    return response.data;
  },

  deleteProfile: async (id) => {
    const response = await apiClient.delete(`/profiles/${id}`);
    return response.data;
  },
};

// Project Group API
export const projectGroupAPI = {
  getAllProjectGroups: async () => {
    const response = await apiClient.get('/project-groups');
    return response.data;
  },

  getProjectGroupById: async (id) => {
    const response = await apiClient.get(`/project-groups/${id}`);
    return response.data;
  },

  createProjectGroup: async (groupData) => {
    const response = await apiClient.post('/project-groups', groupData);
    return response.data;
  },

  updateProjectGroup: async (id, groupData) => {
    const response = await apiClient.put(`/project-groups/${id}`, groupData);
    return response.data;
  },

  deleteProjectGroup: async (id) => {
    const response = await apiClient.delete(`/project-groups/${id}`);
    return response.data;
  },
};

// Rubric Evaluation API
export const rubricEvaluationAPI = {
  getAllRubricEvaluations: async () => {
    const response = await apiClient.get('/rubric-evaluations');
    return response.data;
  },

  getRubricEvaluationById: async (id) => {
    const response = await apiClient.get(`/rubric-evaluations/${id}`);
    return response.data;
  },

  createRubricEvaluation: async (evaluationData) => {
    const response = await apiClient.post('/rubric-evaluations', evaluationData);
    return response.data;
  },

  updateRubricEvaluation: async (id, evaluationData) => {
    const response = await apiClient.put(`/rubric-evaluations/${id}`, evaluationData);
    return response.data;
  },

  deleteRubricEvaluation: async (id) => {
    const response = await apiClient.delete(`/rubric-evaluations/${id}`);
    return response.data;
  },
};

// Ai Reminder Log API
export const aiReminderLogAPI = {
  getAllAiReminderLogs: async () => {
    const response = await apiClient.get('/ai-reminder-logs');
    return response.data;
  },

  getAiReminderLogById: async (id) => {
    const response = await apiClient.get(`/ai-reminder-logs/${id}`);
    return response.data;
  },

  createAiReminderLog: async (logData) => {
    const response = await apiClient.post('/ai-reminder-logs', logData);
    return response.data;
  },

  updateAiReminderLog: async (id, logData) => {
    const response = await apiClient.put(`/ai-reminder-logs/${id}`, logData);
    return response.data;
  },

  deleteAiReminderLog: async (id) => {
    const response = await apiClient.delete(`/ai-reminder-logs/${id}`);
    return response.data;
  },
};

// Audit Log API
export const auditLogAPI = {
  getAllAuditLogs: async () => {
    const response = await apiClient.get('/audit-logs');
    return response.data;
  },

  getAuditLogById: async (id) => {
    const response = await apiClient.get(`/audit-logs/${id}`);
    return response.data;
  },

  createAuditLog: async (logData) => {
    const response = await apiClient.post('/audit-logs', logData);
    return response.data;
  },

  updateAuditLog: async (id, logData) => {
    const response = await apiClient.put(`/audit-logs/${id}`, logData);
    return response.data;
  },

  deleteAuditLog: async (id) => {
    const response = await apiClient.delete(`/audit-logs/${id}`);
    return response.data;
  },
};