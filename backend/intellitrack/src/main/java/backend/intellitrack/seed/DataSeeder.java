package backend.intellitrack.seed;

import backend.intellitrack.model.*;
import backend.intellitrack.repository.ProjectRepository;
import backend.intellitrack.repository.SubmissionRiskRepository;
import backend.intellitrack.repository.SubmissionRepository;
import backend.intellitrack.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final SubmissionRepository submissionRepository;
    private final SubmissionRiskRepository submissionRiskRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, ProjectRepository projectRepository, SubmissionRepository submissionRepository, SubmissionRiskRepository submissionRiskRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.submissionRepository = submissionRepository;
        this.submissionRiskRepository = submissionRiskRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedUsers();
            seedProjects();
            seedSubmissions();
            seedRisks();
        }
    }

    private void seedUsers() {
        User admin = new User();
        admin.setEmail("admin@example.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(UserRole.ADMIN);
        userRepository.save(admin);

        User coordinator = new User();
        coordinator.setEmail("coordinator@example.com");
        coordinator.setPassword(passwordEncoder.encode("coordinator123"));
        coordinator.setRole(UserRole.COORDINATOR);
        userRepository.save(coordinator);

        User student = new User();
        student.setEmail("student@example.com");
        student.setPassword(passwordEncoder.encode("student123"));
        student.setRole(UserRole.STUDENT);
        userRepository.save(student);
    }

    private void seedProjects() {
        User coordinator = userRepository.findByEmail("coordinator@example.com").orElseThrow();

        Project project = new Project();
        project.setTitle("IntelliTrack System");
        project.setAcademicYear("2023-2024");
        project.setCoordinatorId(coordinator.getId());
        projectRepository.save(project);
    }

    private void seedSubmissions() {
        Project project = projectRepository.findAll().get(0);

        Submission submission = new Submission();
        submission.setMilestoneId(1L); // placeholder
        submission.setGroupId(1L); // placeholder
        submission.setStatus(SubmissionStatus.PENDING);
        submissionRepository.save(submission);
    }

    private void seedRisks() {
        Submission submission = submissionRepository.findAll().get(0);

        SubmissionRisk risk = new SubmissionRisk();
        risk.setSubmissionId(submission.getId());
        risk.setRiskLevel(RiskLevel.LOW);
        risk.setRiskScore(0.1);
        submissionRiskRepository.save(risk);
    }
}