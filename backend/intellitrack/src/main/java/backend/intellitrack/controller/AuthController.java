package backend.intellitrack.controller;

import backend.intellitrack.dto.LoginRequest;
import backend.intellitrack.dto.LoginResponse;
import backend.intellitrack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.authenticate(request);
        
        if (response == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        // Token validation logic would go here
        Map<String, Boolean> response = new HashMap<>();
        response.put("valid", true);
        return ResponseEntity.ok(response);
    }
}
