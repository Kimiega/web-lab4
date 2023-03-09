package com.kimiega.weblab4.utlis;

public class CheckerHits {

    public static boolean check(Double x, Double y, Double r) {
        return checkCircle(x, y, r) || checkRectangle(x, y, r) || checkTriangle(x, y, r);
    }
    private static boolean checkTriangle(Double x, Double y, Double r) {
        return x <= 0 && y <= 0 && y >= -r/2 && (y >= (-x - r/2)) && x >= -r/2;
    }
    private static boolean checkRectangle(Double x, Double y, Double r) {
        return x >= 0 && y <= 0 && y >= -r && x <= r;
    }
    private static boolean checkCircle(Double x, Double y, Double r) {
        return x >= 0 && y >= 0 && x * x + y * y <= r/2 * r/2;
    }

}
