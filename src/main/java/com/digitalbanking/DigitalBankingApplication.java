package com.digitalbanking;

import com.digitalbanking.dtos.BankAccountDTO;
import com.digitalbanking.dtos.CurrentBankAccountDTO;
import com.digitalbanking.dtos.CustomerDTO;
import com.digitalbanking.dtos.SavingBankAccountDTO;
import com.digitalbanking.exceptions.CustomerNotFoundException;
import com.digitalbanking.services.BankAccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
public class DigitalBankingApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitalBankingApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(BankAccountService bankAccountService) {
        return args -> {
            Stream.of("Hassan", "Imane", "Mohamed").forEach(name -> {
                CustomerDTO customer = new CustomerDTO();
                customer.setName(name);
                customer.setEmail(name + "@gmail.com");
                bankAccountService.saveCustomer(customer);
            });
            bankAccountService.listCustomers().forEach(customer -> {
                try {
                    bankAccountService.saveCurrentBankAccount(Math.random() * 90000, 9000, customer.getId());
                    bankAccountService.saveSavingBankAccount(Math.random() * 120000, 5.5, customer.getId());

                } catch (CustomerNotFoundException e) {
                    e.printStackTrace();
                }
            });
            List<BankAccountDTO> bankAccounts = bankAccountService.bankAccountList();
            for (BankAccountDTO bankAccount : bankAccounts) {
                for (int i = 0; i < 10; i++) {
                    String accountId;
                    if (bankAccount instanceof SavingBankAccountDTO) {
                        accountId = ((SavingBankAccountDTO) bankAccount).getId();
                    } else {
                        accountId = ((CurrentBankAccountDTO) bankAccount).getId();
                    }
                    bankAccountService.credit(accountId, 10000 + Math.random() * 120000, "Credit");
                    bankAccountService.debit(accountId, 1000 + Math.random() * 9000, "Debit");
                }
            }
        };
    }

    @Bean
    CommandLineRunner saveUsers(com.digitalbanking.security.services.AccountService accountService) {
        return args -> {
            accountService.addNewRole(new com.digitalbanking.security.entities.AppRole(null, "USER"));
            accountService.addNewRole(new com.digitalbanking.security.entities.AppRole(null, "ADMIN"));

            accountService.addNewUser(new com.digitalbanking.security.entities.AppUser("user1", "user1", "1234",
                    "user1@gmail.com", new java.util.ArrayList<>()));
            accountService.addNewUser(new com.digitalbanking.security.entities.AppUser("admin", "admin", "1234",
                    "admin@gmail.com", new java.util.ArrayList<>()));

            accountService.addRoleToUser("user1", "USER");
            accountService.addRoleToUser("admin", "USER");
            accountService.addRoleToUser("admin", "ADMIN");
        };
    }

}
