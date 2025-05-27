import java.util.*;
class EvenorOddChecker{
public static void main(String[] args) {
        Scanner input=new Scanner(System.in);
        System.out.println("***********Odd or Even Checker************");
        System.out.print("Enter a Number : ");
        int num=input.nextInt();
        if(num%2==0){
            System.out.println("The Number is Even");
        }
        else{
            System.out.println("The Number is Odd");
        }
        input.close();
    }
}