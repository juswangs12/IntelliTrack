package backend.intellitrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan("backend.intellitrack.model")
@EnableScheduling
public class IntellitrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntellitrackApplication.class, args);
	}

}
