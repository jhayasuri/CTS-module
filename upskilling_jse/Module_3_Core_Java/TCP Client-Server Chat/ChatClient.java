import java.io.*;
import java.net.*;

public class ChatClient {
    public static void main(String[] args) {
        String host = "localhost";
        int port = 12345;

        try (Socket socket = new Socket(host, port)) {
            System.out.println("Connected to server.");

            // Streams
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

            // Communication loop
            String message;
            while (true) {
                System.out.print("Client: ");
                message = userInput.readLine();
                out.println(message);

                if (message.equalsIgnoreCase("exit")) {
                    System.out.println("Disconnected from server.");
                    break;
                }

                String reply = in.readLine();
                System.out.println("Server: " + reply);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
