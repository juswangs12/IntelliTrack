package backend.intellitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String academicYear;

    @Column(name = "coordinator_id", nullable = false)
    private Long coordinatorId;

    public Project() {}

    public Project(Long id, String title, String academicYear, Long coordinatorId) {
        this.id = id;
        this.title = title;
        this.academicYear = academicYear;
        this.coordinatorId = coordinatorId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public Long getCoordinatorId() { return coordinatorId; }
    public void setCoordinatorId(Long coordinatorId) { this.coordinatorId = coordinatorId; }
}