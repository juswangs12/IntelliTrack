package backend.intellitrack.controller;

import backend.intellitrack.model.RubricEvaluation;
import backend.intellitrack.service.RubricEvaluationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rubric-evaluations")
public class RubricEvaluationController {

    private final RubricEvaluationService rubricEvaluationService;

    public RubricEvaluationController(RubricEvaluationService rubricEvaluationService) {
        this.rubricEvaluationService = rubricEvaluationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<RubricEvaluation>> getAllRubricEvaluations() {
        return ResponseEntity.ok(rubricEvaluationService.getAllRubricEvaluations());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<RubricEvaluation> getRubricEvaluationById(@PathVariable Long id) {
        return rubricEvaluationService.getRubricEvaluationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<RubricEvaluation> createRubricEvaluation(@RequestBody RubricEvaluation rubricEvaluation) {
        return ResponseEntity.ok(rubricEvaluationService.saveRubricEvaluation(rubricEvaluation));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<RubricEvaluation> updateRubricEvaluation(@PathVariable Long id, @RequestBody RubricEvaluation rubricEvaluation) {
        if (!rubricEvaluationService.getRubricEvaluationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        rubricEvaluation.setId(id);
        return ResponseEntity.ok(rubricEvaluationService.saveRubricEvaluation(rubricEvaluation));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteRubricEvaluation(@PathVariable Long id) {
        if (!rubricEvaluationService.getRubricEvaluationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        rubricEvaluationService.deleteRubricEvaluation(id);
        return ResponseEntity.noContent().build();
    }
}