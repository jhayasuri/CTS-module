public class TypeCasting {
    public static void main(String[] args) {
        double dV = 9.75;
        int iFD = (int) dV; 
        int iV = 15;
        double dFI = iV;
        System.out.println("Original double value: " + dV);
        System.out.println("After casting to int: " + iFD);
        System.out.println("Original int value: " + iV);
        System.out.println("After casting to double: " + dFI);
    }
}
