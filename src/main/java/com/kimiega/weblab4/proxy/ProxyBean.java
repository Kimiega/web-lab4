package com.kimiega.weblab4.proxy;

import com.kimiega.weblab4.services.AuditService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.InvocationHandler;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

import java.util.*;

@Component
public class ProxyBean implements BeanPostProcessor {
    private final Map<Class<?>, Set<Method>> auditedClasses = new HashMap<>();
    private AuditService auditService;

    @Autowired
    public ProxyBean(AuditService auditService){
        this.auditService = auditService;

    }
    @Override
    public Object postProcessBeforeInitialization(final Object bean, String beanName) throws BeansException {
        Class<?> beanClass = bean.getClass();
        if (beanClass.isAnnotationPresent(Component.class))
            for (Method m : beanClass.getDeclaredMethods())
                if (m.isAnnotationPresent(Audited.class)) {
                    auditedClasses.putIfAbsent(beanClass, new HashSet<>());
                    auditedClasses.get(beanClass).add(m);
                }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        Class<?> beanClass = bean.getClass();
        if (auditedClasses.containsKey(beanClass)) {
            return Enhancer.create(beanClass, new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        return getLoggerInvocationHandlerLogic(method, args, bean);
                }
            });
        }
        return bean;
    }
    @SneakyThrows
    private Object getLoggerInvocationHandlerLogic(Method method, Object[] args, Object t) {
        if (method.isAnnotationPresent(Audited.class))
            auditService.save(method);
        try {
            return method.invoke(t, args);
        } catch (Exception e) {
            throw e.getCause();
        }
    }
}