package backend.intellitrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentDashboard(@PathVariable Long studentId) {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalSubmissions", 8);
        dashboard.put("pendingReviews", 2);
        dashboard.put("approved", 5);
        dashboard.put("revisionsNeeded", 1);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/coordinator/{coordinatorId}")
    public ResponseEntity<?> getCoordinatorDashboard(@PathVariable Long coordinatorId) {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("advisedTeams", 3);
        dashboard.put("pendingReviews", 8);
        dashboard.put("reviewedThisWeek", 12);
        dashboard.put("atRiskProjects", 1);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalStudents", 156);
        dashboard.put("totalAdvisers", 8);
        dashboard.put("activeProjects", 12);
        dashboard.put("pendingReviews", 24);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", 172);
        analytics.put("totalSubmissions", 348);
        analytics.put("completionRate", 92);
        analytics.put("avgResponseTime", 2.3);
        return ResponseEntity.ok(analytics);
    }
}
