package backend.intellitrack.controller;

import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.model.User;
import backend.intellitrack.service.SubmissionService;
import backend.intellitrack.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserService userService;

    public SubmissionController(SubmissionService submissionService, UserService userService) {
        this.submissionService = submissionService;
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        List<Submission> submissions = submissionService.getAllSubmissions();
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubmissionById(@PathVariable Long id) {
        Optional<Submission> submission = submissionService.getSubmissionById(id);
        if (submission.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Submission not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(submission.get());
    }

    @GetMapping("/group/{groupId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Submission>> getSubmissionsByGroupId(@PathVariable Long groupId) {
        List<Submission> submissions = submissionService.getSubmissionsByGroupId(groupId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<Submission>> getSubmissionsByStatus(@PathVariable String status) {
        try {
            SubmissionStatus submissionStatus = SubmissionStatus.valueOf(status.toUpperCase());
            List<Submission> submissions = submissionService.getSubmissionsByStatus(submissionStatus);
            return ResponseEntity.ok(submissions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Submission> createSubmission(@RequestBody Submission submission) {
        Submission created = submissionService.createSubmission(submission);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> updateSubmission(@PathVariable Long id, @RequestBody Submission submission) {
        Submission updated = submissionService.updateSubmission(id, submission);
        if (updated == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Submission not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSubmission(@PathVariable Long id) {
        boolean deleted = submissionService.deleteSubmission(id);
        Map<String, Object> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Submission deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Submission not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
