package backend.intellitrack.repository;

import backend.intellitrack.model.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectGroupRepository extends JpaRepository<ProjectGroup, Long> {
}