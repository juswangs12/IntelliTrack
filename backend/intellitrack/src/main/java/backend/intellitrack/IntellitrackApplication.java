package backend.intellitrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("backend.intellitrack.model")
public class IntellitrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntellitrackApplication.class, args);
	}

}
