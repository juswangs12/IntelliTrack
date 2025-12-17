package backend.intellitrack.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "project_groups")
public class ProjectGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;

    @ManyToOne
    private User adviser;

    @ManyToMany
    private Set<User> students;
    
    public ProjectGroup() {}

    public ProjectGroup(Long id, String groupName, User adviser, Set<User> students) {
        this.id = id;
        this.groupName = groupName;
        this.adviser = adviser;
        this.students = students;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public User getAdviser() { return adviser; }
    public void setAdviser(User adviser) { this.adviser = adviser; }

    public Set<User> getStudents() { return students; }
    public void setStudents(Set<User> students) { this.students = students; }
}