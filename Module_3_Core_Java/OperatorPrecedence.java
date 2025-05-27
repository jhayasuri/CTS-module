public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        System.out.println("Result of 10 + 5 * 2 = " + result1);
        int result2 = (10 + 5) * 2; 
        System.out.println("Result of (10 + 5) * 2 = " + result2);
        int result3 = 20 / 5 * 2; 
        System.out.println("Result of 20 / 5 * 2 = " + result3);
        int result4 = 10 + 4 * 3 - 2;
        System.out.println("Result of 10 + 4 * 3 - 2 = " + result4);
        int result5 = 10 + 8 % 3 * 2;
        System.out.println("Result of 10 + 8 % 3 * 2 = " + result5);
    }
}
