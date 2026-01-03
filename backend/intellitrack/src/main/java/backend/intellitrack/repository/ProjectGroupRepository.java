package backend.intellitrack.repository;

import backend.intellitrack.model.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectGroupRepository extends JpaRepository<ProjectGroup, Long> {
    List<ProjectGroup> findByProjectId(Long projectId);
    List<ProjectGroup> findByAdviserId(Long adviserId);
}