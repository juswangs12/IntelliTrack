package backend.intellitrack.controller;

import backend.intellitrack.model.DocumentVersion;
import backend.intellitrack.service.DocumentVersionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/document-versions")
public class DocumentVersionController {

    private final DocumentVersionService documentVersionService;

    public DocumentVersionController(DocumentVersionService documentVersionService) {
        this.documentVersionService = documentVersionService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'COORDINATOR', 'ADMIN')")
    public ResponseEntity<List<DocumentVersion>> getAllDocumentVersions() {
        List<DocumentVersion> documentVersions = documentVersionService.getAllDocumentVersions();
        return ResponseEntity.ok(documentVersions);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'COORDINATOR', 'ADMIN')")
    public ResponseEntity<?> getDocumentVersionById(@PathVariable Long id) {
        Optional<DocumentVersion> documentVersion = documentVersionService.getDocumentVersionById(id);
        if (documentVersion.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Document version not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(documentVersion.get());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'COORDINATOR', 'ADMIN')")
    public ResponseEntity<DocumentVersion> createDocumentVersion(@RequestBody DocumentVersion documentVersion) {
        DocumentVersion created = documentVersionService.createDocumentVersion(documentVersion);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'COORDINATOR', 'ADMIN')")
    public ResponseEntity<?> updateDocumentVersion(@PathVariable Long id, @RequestBody DocumentVersion documentVersion) {
        DocumentVersion updated = documentVersionService.updateDocumentVersion(id, documentVersion);
        if (updated == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Document version not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDINATOR', 'ADMIN')")
    public ResponseEntity<?> deleteDocumentVersion(@PathVariable Long id) {
        boolean deleted = documentVersionService.deleteDocumentVersion(id);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Document version deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Document version not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
