package com.kimiega.weblab4.services;

import com.kimiega.weblab4.entities.Audit;
import com.kimiega.weblab4.repositories.AuditRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;

@Service
@NoArgsConstructor
public class AuditService {
    @Autowired
    private AuditRepository auditRepository;

    public void save(Method method) {
        Audit audit = new Audit(method.getName());
        auditRepository.save(audit);
    }
}