package backend.intellitrack.controller;

import backend.intellitrack.model.Deadline;
import backend.intellitrack.service.DeadlineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deadlines")
public class DeadlineController {

    private final DeadlineService deadlineService;

    public DeadlineController(DeadlineService deadlineService) {
        this.deadlineService = deadlineService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<Deadline>> getAllDeadlines() {
        return ResponseEntity.ok(deadlineService.getAllDeadlines());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<Deadline> getDeadlineById(@PathVariable Long id) {
        return deadlineService.getDeadlineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Deadline> createDeadline(@RequestBody Deadline deadline) {
        return ResponseEntity.ok(deadlineService.saveDeadline(deadline));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Deadline> updateDeadline(@PathVariable Long id, @RequestBody Deadline deadline) {
        if (!deadlineService.getDeadlineById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        deadline.setId(id);
        return ResponseEntity.ok(deadlineService.saveDeadline(deadline));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteDeadline(@PathVariable Long id) {
        if (!deadlineService.getDeadlineById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        deadlineService.deleteDeadline(id);
        return ResponseEntity.noContent().build();
    }
}