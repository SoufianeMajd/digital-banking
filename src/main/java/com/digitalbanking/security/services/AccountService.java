package com.digitalbanking.security.services;

import com.digitalbanking.security.entities.AppRole;
import com.digitalbanking.security.entities.AppUser;

import java.util.List;

public interface AccountService {
    AppUser addNewUser(AppUser appUser);

    AppRole addNewRole(AppRole appRole);

    void addRoleToUser(String username, String roleName);

    AppUser loadUserByUsername(String username);

    List<AppUser> listUsers();
}
