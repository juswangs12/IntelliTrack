package backend.intellitrack.repository;

import backend.intellitrack.model.Project;
import backend.intellitrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCoordinator(User coordinator);
    List<Project> findByStudentsContaining(User student);
}