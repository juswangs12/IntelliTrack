package backend.intellitrack.controller;

import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.model.User;
import backend.intellitrack.model.UserRole;
import backend.intellitrack.service.SubmissionService;
import backend.intellitrack.service.UserService;
import backend.intellitrack.service.analytics.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SubmissionService submissionService;
    private final UserService userService;
    private final AnalyticsService analyticsService;

    public DashboardController(SubmissionService submissionService, UserService userService, AnalyticsService analyticsService) {
        this.submissionService = submissionService;
        this.userService = userService;
        this.analyticsService = analyticsService;
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> getStudentDashboard(@PathVariable Long studentId) {
        Optional<User> student = userService.getUserById(studentId);
        if (student.isEmpty() || student.get().getRole() != UserRole.STUDENT) {
            return ResponseEntity.notFound().build();
        }
        List<Submission> submissions = submissionService.getSubmissionsByStudent(student.get());
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalSubmissions", submissions.size());
        dashboard.put("pendingReviews", submissions.stream().filter(s -> s.getStatus() == SubmissionStatus.PENDING).count());
        dashboard.put("approved", submissions.stream().filter(s -> s.getStatus() == SubmissionStatus.APPROVED).count());
        dashboard.put("revisionsNeeded", submissions.stream().filter(s -> s.getStatus() == SubmissionStatus.REJECTED).count());
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/coordinator/{coordinatorId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> getCoordinatorDashboard(@PathVariable Long coordinatorId) {
        Optional<User> coordinator = userService.getUserById(coordinatorId);
        if (coordinator.isEmpty() || coordinator.get().getRole() != UserRole.COORDINATOR) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("advisedTeams", 3);
        dashboard.put("pendingReviews", analyticsService.getSubmissionCountByStatus(SubmissionStatus.PENDING));
        dashboard.put("reviewedThisWeek", 12);
        dashboard.put("atRiskProjects", 1);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalStudents", userService.getAllUsers().stream().filter(u -> u.getRole() == UserRole.STUDENT).count());
        dashboard.put("totalAdvisers", userService.getAllUsers().stream().filter(u -> u.getRole() == UserRole.COORDINATOR).count());
        dashboard.put("activeProjects", 12);
        dashboard.put("pendingReviews", analyticsService.getSubmissionCountByStatus(SubmissionStatus.PENDING));
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", analyticsService.getTotalUsers());
        analytics.put("totalSubmissions", analyticsService.getTotalSubmissions());
        analytics.put("completionRate", 92);
        analytics.put("avgResponseTime", 2.3);
        return ResponseEntity.ok(analytics);
    }
}
