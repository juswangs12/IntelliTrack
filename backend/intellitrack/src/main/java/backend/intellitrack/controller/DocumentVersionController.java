package backend.intellitrack.controller;

import backend.intellitrack.model.DocumentVersion;
import backend.intellitrack.service.DocumentVersionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document-versions")
public class DocumentVersionController {

    private final DocumentVersionService documentVersionService;

    public DocumentVersionController(DocumentVersionService documentVersionService) {
        this.documentVersionService = documentVersionService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<List<DocumentVersion>> getAllDocumentVersions() {
        return ResponseEntity.ok(documentVersionService.getAllDocumentVersions());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<DocumentVersion> getDocumentVersionById(@PathVariable Long id) {
        return documentVersionService.getDocumentVersionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<DocumentVersion> createDocumentVersion(@RequestBody DocumentVersion documentVersion) {
        return ResponseEntity.ok(documentVersionService.saveDocumentVersion(documentVersion));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<DocumentVersion> updateDocumentVersion(@PathVariable Long id, @RequestBody DocumentVersion documentVersion) {
        if (!documentVersionService.getDocumentVersionById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        documentVersion.setId(id);
        return ResponseEntity.ok(documentVersionService.saveDocumentVersion(documentVersion));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteDocumentVersion(@PathVariable Long id) {
        if (!documentVersionService.getDocumentVersionById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        documentVersionService.deleteDocumentVersion(id);
        return ResponseEntity.noContent().build();
    }
}