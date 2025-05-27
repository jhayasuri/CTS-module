public class Person {
    private String name;

    public Person() {
        this.name = "Hari Prasad";
    }

    public void greet() {
        System.out.println("Hello, " + name + "!");
    }

    public void setName(String name) {
        this.name = name;
    }
}
