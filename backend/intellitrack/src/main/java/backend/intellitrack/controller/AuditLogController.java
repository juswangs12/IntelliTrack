package backend.intellitrack.controller;

import backend.intellitrack.model.AuditLog;
import backend.intellitrack.service.AuditLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLog>> getAllAuditLogs() {
        return ResponseEntity.ok(auditLogService.getAllAuditLogs());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuditLog> getAuditLogById(@PathVariable Long id) {
        return auditLogService.getAuditLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuditLog> createAuditLog(@RequestBody AuditLog auditLog) {
        return ResponseEntity.ok(auditLogService.saveAuditLog(auditLog));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuditLog> updateAuditLog(@PathVariable Long id, @RequestBody AuditLog auditLog) {
        if (!auditLogService.getAuditLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        auditLog.setId(id);
        return ResponseEntity.ok(auditLogService.saveAuditLog(auditLog));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAuditLog(@PathVariable Long id) {
        if (!auditLogService.getAuditLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        auditLogService.deleteAuditLog(id);
        return ResponseEntity.noContent().build();
    }
}