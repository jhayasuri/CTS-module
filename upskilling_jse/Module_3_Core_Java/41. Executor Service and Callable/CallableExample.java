import java.util.concurrent.*;
import java.util.*;

public class CallableExample {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        List<Future<String>> results = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            int taskId = i;
            Callable<String> task = () -> {
                Thread.sleep(500); 
                return "Result from Task " + taskId + " on " + Thread.currentThread().getName();
            };
            Future<String> future = executor.submit(task);
            results.add(future);
        }
        for (Future<String> future : results) {
            String result = future.get(); 
            System.out.println(result);
        }
        executor.shutdown();
    }
}
