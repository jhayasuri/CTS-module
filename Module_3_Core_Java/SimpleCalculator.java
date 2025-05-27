import java.util.Scanner;
class SimpleCalculator{
    public static void main(String[] args) {
        Scanner input=new Scanner(System.in);
        System.out.println("Enter the Number 1 : ");
        int n1=input.nextInt();
        System.out.println("Enter the Number 2 : ");
        int n2=input.nextInt();
        System.out.println("1.Addition\n2.Substraction\n3.Multiplication\n4.Division");
        System.out.println("Enter the Choice: ");
        int option=input.nextInt();
        int result;
        switch(option){
            case 1:
                result = n1 + n2;
                System.out.println("Result = " + result);
                break;
            case 2:
                result = n1 - n2;
                System.out.println("Result = " + result);
                break;
            case 3:
                result = n1 * n2;
                System.out.println("Result = " + result);
                break;
            case 4:
                if (n2 != 0) {
                    result = n1 / n2;
                    System.out.println("Result = " + result);
                } else {
                    System.out.println("Error: Cannot divide by zero.");
                }
                break;
            default:
                System.out.println("Invalid operator!");
        }
        input.close();

        }
    }
