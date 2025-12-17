package backend.intellitrack.service;

import backend.intellitrack.model.ProjectGroup;
import backend.intellitrack.repository.ProjectGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectGroupService {

    private final ProjectGroupRepository projectGroupRepository;

    public ProjectGroupService(ProjectGroupRepository projectGroupRepository) {
        this.projectGroupRepository = projectGroupRepository;
    }

    public List<ProjectGroup> getAllProjectGroups() {
        return projectGroupRepository.findAll();
    }

    public Optional<ProjectGroup> getProjectGroupById(Long id) {
        return projectGroupRepository.findById(id);
    }

    public ProjectGroup saveProjectGroup(ProjectGroup projectGroup) {
        return projectGroupRepository.save(projectGroup);
    }

    public void deleteProjectGroup(Long id) {
        projectGroupRepository.deleteById(id);
    }
}