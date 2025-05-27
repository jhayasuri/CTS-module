import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>(); 
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter student details (type -1 to stop):");
        while (true) {
            System.out.print("Enter Student ID (integer): ");
            int id = scanner.nextInt();
            scanner.nextLine(); 
            if (id == -1) {
                break; 
            }
            System.out.print("Enter Student Name: ");
            String name = scanner.nextLine();
            studentMap.put(id, name); 
        }
        System.out.print("\nEnter a Student ID to search: ");
        int searchId = scanner.nextInt();
        if (studentMap.containsKey(searchId)) {
            String studentName = studentMap.get(searchId);
            System.out.println("Student Name: " + studentName);
        } else {
            System.out.println("Student ID not found.");
        }

        scanner.close();
    }
}
