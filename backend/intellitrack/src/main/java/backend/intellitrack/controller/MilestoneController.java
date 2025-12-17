package backend.intellitrack.controller;

import backend.intellitrack.model.Milestone;
import backend.intellitrack.service.MilestoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    private final MilestoneService milestoneService;

    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<List<Milestone>> getAllMilestones() {
        return ResponseEntity.ok(milestoneService.getAllMilestones());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<Milestone> getMilestoneById(@PathVariable Long id) {
        return milestoneService.getMilestoneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Milestone> createMilestone(@RequestBody Milestone milestone) {
        return ResponseEntity.ok(milestoneService.saveMilestone(milestone));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable Long id, @RequestBody Milestone milestone) {
        if (!milestoneService.getMilestoneById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        milestone.setId(id);
        return ResponseEntity.ok(milestoneService.saveMilestone(milestone));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        if (!milestoneService.getMilestoneById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        milestoneService.deleteMilestone(id);
        return ResponseEntity.noContent().build();
    }
}