package backend.intellitrack.repository;

import backend.intellitrack.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByProjectIdAndActive(Long projectId, boolean active);
}