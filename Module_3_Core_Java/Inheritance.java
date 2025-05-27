class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class Inheritance {
    public static void main(String[] args) {
        Animal gAnimal = new Animal();
        gAnimal.makeSound(); 
        Dog dog = new Dog();
        dog.makeSound();
    }
}
