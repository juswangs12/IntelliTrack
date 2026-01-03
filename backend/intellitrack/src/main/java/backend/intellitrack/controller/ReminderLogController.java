package backend.intellitrack.controller;

import backend.intellitrack.model.ReminderLog;
import backend.intellitrack.service.ReminderLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminder-logs")
public class ReminderLogController {

    private final ReminderLogService reminderLogService;

    public ReminderLogController(ReminderLogService reminderLogService) {
        this.reminderLogService = reminderLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReminderLog>> getAllReminderLogs() {
        return ResponseEntity.ok(reminderLogService.getAllReminderLogs());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReminderLog> getReminderLogById(@PathVariable Long id) {
        return reminderLogService.getReminderLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReminderLog> createReminderLog(@RequestBody ReminderLog reminderLog) {
        return ResponseEntity.ok(reminderLogService.saveReminderLog(reminderLog));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReminderLog> updateReminderLog(@PathVariable Long id, @RequestBody ReminderLog reminderLog) {
        if (!reminderLogService.getReminderLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reminderLog.setId(id);
        return ResponseEntity.ok(reminderLogService.saveReminderLog(reminderLog));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReminderLog(@PathVariable Long id) {
        if (!reminderLogService.getReminderLogById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reminderLogService.deleteReminderLog(id);
        return ResponseEntity.noContent().build();
    }
}