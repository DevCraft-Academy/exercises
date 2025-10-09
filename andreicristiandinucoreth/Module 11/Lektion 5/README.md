# Security Analysis of a Web Application

## Introduction

This document presents a comprehensive security analysis of an e-commerce web application. The codebase analysed comes from a computer science course I did in Uni, so many parts of the application were not implemented ideally, but form a good example for this exercise.

**Application Overview:** Online e-commerce platform with user registration, product catalog, shopping cart, payment processing, and order management functionality.

## 1. Identification of Security Aspects

### Main Application Components:

- **Frontend:** React.js single-page application (SPA)
- **Backend:** Node.js/Express.js REST API server
- **Database:** PostgreSQL for user data, products, and orders
- **Cache:** Redis for session storage and caching

## 2. Authentication and Authorization Review

### Authentication Mechanisms:

- **Login System:** Email/password combination with bcrypt hashing
- **Password Policy:** Minimum 8 characters, requires uppercase, lowercase, numbers
- **Session Management:** JWT tokens with 24-hour expiration
- **OAuth Integration:** Google and Facebook single sign-on

### Authorization Procedures:

- **Role-Based Access Control (RBAC):** Customer, Admin, Super Admin roles
- **Resource-Level Permissions:** Users can only access their own orders and data
- **API Endpoint Protection:** JWT middleware validates tokens on protected routes
- **Admin Panel Access:** Separate authentication flow with enhanced security

### Identified Issues:

- Password reset tokens don't expire
- No account lockout after failed login attempts
- JWT tokens stored in localStorage (vulnerable to XSS)

## 3. Data Transmission and Storage Security

### Data Transmission:

- **HTTPS Implementation:** TLS 1.3 enforced across all endpoints
- **Certificate Management:** Valid SSL certificates with automatic renewal
- **API Communication:** All external API calls use HTTPS
- **Internal Communication:** Database connections use SSL

### Data Storage:

- **Password Storage:** bcrypt with salt rounds
- **Sensitive Data Encryption:** Credit card data tokenized through payment processor

### Identified Issues:

- Some internal API calls between microservices use HTTP
- Backup files are not encrypted
- Database connection strings contain plaintext passwords

## 4. Input Processing Analysis

### Input Validation:

- **Frontend Validation:** Client-side validation using Joi schema validation
- **Backend Validation:** Server-side validation with express-validator
- **Database Queries:** Parameterized queries to prevent SQL injection
- **File Upload Validation:** File type and size restrictions implemented

### Security Measures:

- **XSS Prevention:** Content Security Policy (CSP) headers implemented
- **CSRF Protection:** CSRF tokens for state-changing operations
- **Input Sanitization:** HTML input sanitized using DOMPurify
- **Rate Limiting:** API rate limiting implemented (100 requests/minute per IP)

### Identified Issues:

- File upload validation only checks file extensions, not content
- Some user-generated content not properly sanitized
- No input length limits on certain fields

## 5. Error Handling and Logging Assessment

### Error Handling:

- **Generic Error Messages:** Production environment returns generic error messages
- **Error Logging:** Detailed errors logged server-side only
- **Stack Trace Protection:** Stack traces not exposed to end users
- **HTTP Status Codes:** Appropriate status codes returned

### Logging Implementation:

- **Access Logs:** Nginx logs all HTTP requests
- **Application Logs:** Winston.js for structured logging
- **Security Events:** Failed login attempts and suspicious activities logged
- **Log Rotation:** Automated log rotation and archival

### Identified Issues:

- Some error messages still leak technical details
- Logs contain user email addresses
- No centralized log monitoring system

## 6. External Dependencies Review

### Identified Dependencies:

- **Frontend Libraries:** React, Redux, Axios, Bootstrap
- **Backend Libraries:** Express, bcrypt, jsonwebtoken, helmet
- **Database Drivers:** pg (PostgreSQL), redis client
- **Payment Integration:** Stripe SDK
- **Monitoring:** New Relic, Sentry for error tracking

### Security Assessment:

- **Dependency Scanning:** npm audit run regularly
- **Version Management:** Most packages kept up-to-date
- **Security Advisories:** Subscribed to security notifications
- **Third-party Services:** Reputable vendors with good security practices

### Identified Issues:

- Some dependencies are 2+ major versions behind
- No automated dependency vulnerability scanning in CI/CD

## Conclusions and Recommendations

### High Priority (Critical - Fix Immediately):

1. **Secure JWT Storage:** Move JWT tokens from localStorage to httpOnly cookies
2. **Fix Password Reset:** Implement token expiration for password reset links
3. **Encrypt Internal Communication:** Enable HTTPS for all internal API calls
4. **Account Lockout:** Implement progressive delays and account lockout mechanisms

### Medium Priority (Important - Fix Within 30 Days):

1. **Enhanced File Upload Security:** Implement content-based file validation
2. **Dependency Updates:** Update all outdated dependencies with security patches
3. **Input Sanitization:** Improve sanitization for user-generated content

### Low Priority (Recommended - Fix Within 90 Days):

1. **Centralized Logging:** Implement ELK stack or similar for log management
2. **Security Headers:** Add additional security headers (HSTS, X-Content-Type-Options)

### Risk Assessment Summary:

- **Current Security Level:** Moderate - Basic security measures in place but gaps exist
- **Primary Risks:** XSS vulnerabilities, weak session management, data leakage
