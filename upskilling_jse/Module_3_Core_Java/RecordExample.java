import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
record Person(String name, int age) {}
public class RecordExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Jeevan", 25),
            new Person("Hari", 32),
            new Person("Leo", 19),
            new Person("Magesh", 28),
            new Person("Sri", 17)
        );

        System.out.println("All Persons:");
        people.forEach(System.out::println);

        List<Person> adults = people.stream()
                                    .filter(p -> p.age() >= 18)
                                    .collect(Collectors.toList());
        System.out.println("\nAdults (age >= 18):");
        adults.forEach(System.out::println);
    }
}
