package backend.intellitrack.service;

import backend.intellitrack.model.Project;
import backend.intellitrack.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Project> getProjectsByCoordinatorId(Long coordinatorId) {
        return projectRepository.findByCoordinatorId(coordinatorId);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Optional<Project> existing = projectRepository.findById(id);
        if (existing.isPresent()) {
            Project project = existing.get();
            project.setTitle(updatedProject.getTitle());
            project.setAcademicYear(updatedProject.getAcademicYear());
            project.setCoordinatorId(updatedProject.getCoordinatorId());
            return projectRepository.save(project);
        }
        return null;
    }

    public boolean deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
}