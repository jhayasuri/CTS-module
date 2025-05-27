import java.sql.*;

public class StudentDatabaseViewer {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/school";
        String query = "SELECT * FROM students";

        System.out.println("Connecting to the database...");

        try (
            Connection conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
        ) {
            System.out.println("Connected successfully.\n");

            System.out.println("Student Records:");
            System.out.println("--------------------------------------------------");

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                String grade = rs.getString("grade");

                System.out.printf("ID: %d | Name: %-10s | Age: %d | Grade: %s%n", id, name, age, grade);
            }

            System.out.println("--------------------------------------------------");

        } catch (SQLException e) {
            System.out.println("Error while connecting to database: " + e.getMessage());
        }
    }
}
