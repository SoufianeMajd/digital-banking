package com.digitalbanking.mappers;

import com.digitalbanking.dtos.AccountOperationDTO;
import com.digitalbanking.dtos.CurrentBankAccountDTO;
import com.digitalbanking.dtos.CustomerDTO;
import com.digitalbanking.dtos.SavingBankAccountDTO;
import com.digitalbanking.entities.AccountOperation;
import com.digitalbanking.entities.CurrentAccount;
import com.digitalbanking.entities.Customer;
import com.digitalbanking.entities.SavingAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BankAccountMapper {
    CustomerDTO fromCustomer(Customer customer);

    Customer fromCustomerDTO(CustomerDTO customerDTO);

    CurrentBankAccountDTO fromCurrentBankAccount(CurrentAccount currentAccount);

    CurrentAccount fromCurrentBankAccountDTO(CurrentBankAccountDTO currentBankAccountDTO);

    SavingBankAccountDTO fromSavingBankAccount(SavingAccount savingAccount);

    SavingAccount fromSavingBankAccountDTO(SavingBankAccountDTO savingBankAccountDTO);

    AccountOperationDTO fromAccountOperation(AccountOperation accountOperation);

    AccountOperation fromAccountOperationDTO(AccountOperationDTO accountOperationDTO);
}
