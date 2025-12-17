package backend.intellitrack.controller;

import backend.intellitrack.model.ProjectGroup;
import backend.intellitrack.service.ProjectGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-groups")
public class ProjectGroupController {

    private final ProjectGroupService projectGroupService;

    public ProjectGroupController(ProjectGroupService projectGroupService) {
        this.projectGroupService = projectGroupService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<List<ProjectGroup>> getAllProjectGroups() {
        return ResponseEntity.ok(projectGroupService.getAllProjectGroups());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('STUDENT')")
    public ResponseEntity<ProjectGroup> getProjectGroupById(@PathVariable Long id) {
        return projectGroupService.getProjectGroupById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<ProjectGroup> createProjectGroup(@RequestBody ProjectGroup projectGroup) {
        return ResponseEntity.ok(projectGroupService.saveProjectGroup(projectGroup));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<ProjectGroup> updateProjectGroup(@PathVariable Long id, @RequestBody ProjectGroup projectGroup) {
        if (!projectGroupService.getProjectGroupById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        projectGroup.setId(id);
        return ResponseEntity.ok(projectGroupService.saveProjectGroup(projectGroup));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> deleteProjectGroup(@PathVariable Long id) {
        if (!projectGroupService.getProjectGroupById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        projectGroupService.deleteProjectGroup(id);
        return ResponseEntity.noContent().build();
    }
}