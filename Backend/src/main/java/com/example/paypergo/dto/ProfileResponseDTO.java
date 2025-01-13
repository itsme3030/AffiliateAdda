package com.example.paypergo.dto;

import java.util.List;

public class ProfileResponseDTO {
    private String username;
    private List<EarningDTO> earnings;
    private double totalEarnings;
    private List<PayableDTO> payableAmounts;
    private double totalPayableAmount;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<EarningDTO> getEarnings() {
        return earnings;
    }

    public void setEarnings(List<EarningDTO> earnings) {
        this.earnings = earnings;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public List<PayableDTO> getPayableAmounts() {
        return payableAmounts;
    }

    public void setPayableAmounts(List<PayableDTO> payableAmounts) {
        this.payableAmounts = payableAmounts;
    }

    public double getTotalPayableAmount() {
        return totalPayableAmount;
    }

    public void setTotalPayableAmount(double totalPayableAmount) {
        this.totalPayableAmount = totalPayableAmount;
    }

    public static class EarningDTO {
        private String productName;
        private double perClickPrice;
        private long count;

        // Getters and setters

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public double getPerClickPrice() {
            return perClickPrice;
        }

        public void setPerClickPrice(double perClickPrice) {
            this.perClickPrice = perClickPrice;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }

    public static class PayableDTO {
        private String productName;
        private double perClickPrice;
        private long count;

        // Getters and setters

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public double getPerClickPrice() {
            return perClickPrice;
        }

        public void setPerClickPrice(double perClickPrice) {
            this.perClickPrice = perClickPrice;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }
}
