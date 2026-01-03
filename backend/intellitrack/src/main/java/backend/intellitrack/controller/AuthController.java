package backend.intellitrack.controller;

import backend.intellitrack.dto.LoginRequest;
import backend.intellitrack.dto.LoginResponse;
import backend.intellitrack.model.User;
import backend.intellitrack.repository.UserRepository;
import backend.intellitrack.service.AuthService;
import backend.intellitrack.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request.getEmail(), request.getPassword());
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            LoginResponse response = new LoginResponse(user.getId(), user.getEmail(), user.getRole().name().toLowerCase());
            response.setToken(token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        authService.logout();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate() {
        return ResponseEntity.ok(true);
    }
}
