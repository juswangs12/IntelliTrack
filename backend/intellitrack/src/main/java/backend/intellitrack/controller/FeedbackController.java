package backend.intellitrack.controller;

import backend.intellitrack.model.Feedback;
import backend.intellitrack.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.saveFeedback(feedback));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        if (!feedbackService.getFeedbackById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        feedback.setId(id);
        return ResponseEntity.ok(feedbackService.saveFeedback(feedback));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        if (!feedbackService.getFeedbackById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}