package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "milestones")
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private LocalDateTime deadline;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(nullable = false)
    private boolean active = true;

    public Milestone() {}

    public Milestone(Long id, String name, LocalDateTime deadline, Long projectId, boolean active) {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.projectId = projectId;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}