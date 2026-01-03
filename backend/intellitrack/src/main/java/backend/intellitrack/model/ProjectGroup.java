package backend.intellitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "project_groups")
public class ProjectGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "adviser_id", nullable = false)
    private Long adviserId;

    public ProjectGroup() {}

    public ProjectGroup(Long id, Long projectId, Long adviserId) {
        this.id = id;
        this.projectId = projectId;
        this.adviserId = adviserId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getAdviserId() { return adviserId; }
    public void setAdviserId(Long adviserId) { this.adviserId = adviserId; }
}