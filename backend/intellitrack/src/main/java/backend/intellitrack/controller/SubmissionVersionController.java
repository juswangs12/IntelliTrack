package backend.intellitrack.controller;

import backend.intellitrack.model.SubmissionVersion;
import backend.intellitrack.service.SubmissionVersionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission-versions")
public class SubmissionVersionController {

    private final SubmissionVersionService submissionVersionService;

    public SubmissionVersionController(SubmissionVersionService submissionVersionService) {
        this.submissionVersionService = submissionVersionService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<List<SubmissionVersion>> getAllSubmissionVersions() {
        return ResponseEntity.ok(submissionVersionService.getAllSubmissionVersions());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<SubmissionVersion> getSubmissionVersionById(@PathVariable Long id) {
        return submissionVersionService.getSubmissionVersionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<SubmissionVersion> createSubmissionVersion(@RequestBody SubmissionVersion submissionVersion) {
        return ResponseEntity.ok(submissionVersionService.saveSubmissionVersion(submissionVersion));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<SubmissionVersion> updateSubmissionVersion(@PathVariable Long id, @RequestBody SubmissionVersion submissionVersion) {
        if (!submissionVersionService.getSubmissionVersionById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        submissionVersion.setId(id);
        return ResponseEntity.ok(submissionVersionService.saveSubmissionVersion(submissionVersion));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteSubmissionVersion(@PathVariable Long id) {
        if (!submissionVersionService.getSubmissionVersionById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        submissionVersionService.deleteSubmissionVersion(id);
        return ResponseEntity.noContent().build();
    }
}