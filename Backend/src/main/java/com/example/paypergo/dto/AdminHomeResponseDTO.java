package com.example.paypergo.dto;

import java.util.List;

public class AdminHomeResponseDTO {

    private long totalUsers;
    private double totalEarnings;
    private double totalPayableAmount;
    private List<UserDataDTO> users;

    // Getters and setters

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public double getTotalPayableAmount() {
        return totalPayableAmount;
    }

    public void setTotalPayableAmount(double totalPayableAmount) {
        this.totalPayableAmount = totalPayableAmount;
    }

    public List<UserDataDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDataDTO> users) {
        this.users = users;
    }

    public static class UserDataDTO {
        private String username;
        private double totalEarnings;
        private double totalPayableAmount;

        // Getters and setters

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public double getTotalEarnings() {
            return totalEarnings;
        }

        public void setTotalEarnings(double totalEarnings) {
            this.totalEarnings = totalEarnings;
        }

        public double getTotalPayableAmount() {
            return totalPayableAmount;
        }

        public void setTotalPayableAmount(double totalPayableAmount) {
            this.totalPayableAmount = totalPayableAmount;
        }
    }
}
