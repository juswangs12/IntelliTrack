package backend.intellitrack.controller;

import backend.intellitrack.model.AiReminderLog;
import backend.intellitrack.service.AiReminderLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai-reminder-logs")
public class AiReminderLogController {

    private final AiReminderLogService aiReminderLogService;

    public AiReminderLogController(AiReminderLogService aiReminderLogService) {
        this.aiReminderLogService = aiReminderLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AiReminderLog>> getAllAiReminderLogs() {
        return ResponseEntity.ok(aiReminderLogService.getAllAiReminderLogs());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AiReminderLog> getAiReminderLogById(@PathVariable Long id) {
        return aiReminderLogService.getAiReminderLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AiReminderLog> createAiReminderLog(@RequestBody AiReminderLog aiReminderLog) {
        return ResponseEntity.ok(aiReminderLogService.saveAiReminderLog(aiReminderLog));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AiReminderLog> updateAiReminderLog(@PathVariable Long id, @RequestBody AiReminderLog aiReminderLog) {
        if (!aiReminderLogService.getAiReminderLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        aiReminderLog.setId(id);
        return ResponseEntity.ok(aiReminderLogService.saveAiReminderLog(aiReminderLog));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAiReminderLog(@PathVariable Long id) {
        if (!aiReminderLogService.getAiReminderLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        aiReminderLogService.deleteAiReminderLog(id);
        return ResponseEntity.noContent().build();
    }
}