import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileReadExample {
    public static void main(String[] args) {
        try {
            File file = new File("C:\\Users\\lenovo-pc\\Downloads\\upskilling_jse(1.1)\\upskilling_jse\\Core_Java\\output2.txt");
            Scanner reader = new Scanner(file);

            System.out.println("Contents of output.txt:");

            while (reader.hasNextLine()) {
                String line = reader.nextLine(); 
                System.out.println(line); 
            }

            reader.close(); 
        } catch (FileNotFoundException e) {
            System.out.println("The file output.txt was not found.");
            e.printStackTrace();
        }
    }
}

