package backend.intellitrack.controller;

import backend.intellitrack.model.InlineComment;
import backend.intellitrack.service.InlineCommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inline-comments")
public class InlineCommentController {

    private final InlineCommentService inlineCommentService;

    public InlineCommentController(InlineCommentService inlineCommentService) {
        this.inlineCommentService = inlineCommentService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<List<InlineComment>> getAllInlineComments() {
        return ResponseEntity.ok(inlineCommentService.getAllInlineComments());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<InlineComment> getInlineCommentById(@PathVariable Long id) {
        return inlineCommentService.getInlineCommentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<InlineComment> createInlineComment(@RequestBody InlineComment inlineComment) {
        return ResponseEntity.ok(inlineCommentService.saveInlineComment(inlineComment));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<InlineComment> updateInlineComment(@PathVariable Long id, @RequestBody InlineComment inlineComment) {
        if (!inlineCommentService.getInlineCommentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        inlineComment.setId(id);
        return ResponseEntity.ok(inlineCommentService.saveInlineComment(inlineComment));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteInlineComment(@PathVariable Long id) {
        if (!inlineCommentService.getInlineCommentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        inlineCommentService.deleteInlineComment(id);
        return ResponseEntity.noContent().build();
    }
}