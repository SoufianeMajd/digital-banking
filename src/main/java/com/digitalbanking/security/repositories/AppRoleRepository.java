package com.digitalbanking.security.repositories;

import com.digitalbanking.security.entities.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRoleRepository extends JpaRepository<AppRole, String> {
    AppRole findByRoleName(String roleName);
}
