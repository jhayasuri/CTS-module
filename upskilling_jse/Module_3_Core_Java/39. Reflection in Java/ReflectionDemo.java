import java.lang.reflect.*;

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> personClass = Class.forName("Person");
        Object personObj = personClass.getDeclaredConstructor().newInstance();
        Method[] methods = personClass.getDeclaredMethods();

        System.out.println("Methods in Person class:");
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
            Class<?>[] paramTypes = method.getParameterTypes();
            for (Class<?> param : paramTypes) {
                System.out.println(" - Parameter: " + param.getName());
            }
            if (method.getName().equals("greet") && paramTypes.length == 0) {
                method.invoke(personObj); 
            }

            if (method.getName().equals("setName")) {
                method.invoke(personObj, "Reflective Ram");
            }
        }

        // Call greet again after name change
        Method greetAgain = personClass.getDeclaredMethod("greet");
        greetAgain.invoke(personObj);
    }
}
