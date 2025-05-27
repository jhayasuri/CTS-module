import java.time.Duration;
import java.time.Instant;

public class VirtualThreadsDemo {
    public static void main(String[] args) throws InterruptedException {
        int threadCount = 100_000;
        Instant start = Instant.now();
        Thread[] threads = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Hello from virtual thread: " + Thread.currentThread());
            });
        }
        for (Thread t : threads) {
            t.join();
        }
        Instant end = Instant.now();
        System.out.println("Time taken with virtual threads: " + Duration.between(start, end));
    }
}
