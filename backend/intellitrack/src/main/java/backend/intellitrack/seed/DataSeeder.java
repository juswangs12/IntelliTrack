package backend.intellitrack.seed;

import backend.intellitrack.model.*;
import backend.intellitrack.repository.ProjectRepository;
import backend.intellitrack.repository.RiskLogRepository;
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
    private final RiskLogRepository riskLogRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, ProjectRepository projectRepository, SubmissionRepository submissionRepository, RiskLogRepository riskLogRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.submissionRepository = submissionRepository;
        this.riskLogRepository = riskLogRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedUsers();
            seedProjects();
            seedSubmissions();
            seedRiskLogs();
        }
    }

    private void seedUsers() {
        User admin = new User();
        admin.setEmail("admin@example.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("Admin User");
        admin.setRole(UserRole.ADMIN);
        userRepository.save(admin);

        User coordinator = new User();
        coordinator.setEmail("coordinator@example.com");
        coordinator.setPassword(passwordEncoder.encode("coordinator123"));
        coordinator.setName("Dr. Jane Smith");
        coordinator.setRole(UserRole.COORDINATOR);
        userRepository.save(coordinator);

        User student = new User();
        student.setEmail("student@example.com");
        student.setPassword(passwordEncoder.encode("student123"));
        student.setName("John Doe");
        student.setRole(UserRole.STUDENT);
        userRepository.save(student);
    }

    private void seedProjects() {
        User coordinator = userRepository.findByEmail("coordinator@example.com").orElseThrow();
        User student = userRepository.findByEmail("student@example.com").orElseThrow();

        Project project = new Project();
        project.setName("IntelliTrack System");
        project.setCoordinator(coordinator);
        project.getStudents().add(student);
        projectRepository.save(project);
    }

    private void seedSubmissions() {
        User student = userRepository.findByEmail("student@example.com").orElseThrow();
        Project project = projectRepository.findAll().get(0);

        Submission submission = new Submission();
        submission.setProject(project);
        submission.setStudent(student);
        submission.setType(SubmissionType.PROJECT_PROPOSAL);
        submission.setStatus(SubmissionStatus.PENDING);
        submissionRepository.save(submission);
    }

    private void seedRiskLogs() {
        Submission submission = submissionRepository.findAll().get(0);

        RiskLog riskLog = new RiskLog();
        riskLog.setSubmission(submission);
        riskLog.setRiskLevel("Low");
        riskLog.setExplanation("Submission is complete.");
        riskLogRepository.save(riskLog);
    }
}