package com.kimiega.weblab4.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException {
        try {
            filterChain.doFilter(request, response);
        } catch(IllegalArgumentException e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println("Empty JWT Token in Bearer Header");
        }catch(JWTVerificationException | UsernameNotFoundException exc) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println("Invalid JWT Token");
        } catch (ServletException e) {
            Throwable rootCause = e.getRootCause();
            if (rootCause instanceof DataIntegrityViolationException) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                response.getWriter().println("Such login already exists");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().println("Something went wrong!\nPlease contact with admin");
                System.err.println(e.getMessage());
            }
        }
         catch (RuntimeException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("Something went wrong!\nPlease contact with admin");
            System.err.println(e.getMessage());
        }
    }
}
