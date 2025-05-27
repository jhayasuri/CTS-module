import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSortExpression{
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Zara");
        names.add("Arun");
        names.add("John");
        names.add("Meena");
        names.add("David");
        Collections.sort(names, (s1, s2) -> s1.compareTo(s2));
        System.out.println("Sorted List:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}
