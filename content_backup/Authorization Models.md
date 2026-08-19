up:: [[Identity and Access Management]]

# Authorization Models

Authorization models define the frameworks and protocols by which systems determine user privileges or access rights to resources and data. These models are crucial for enforcing security policies within software and systems, ensuring that users can only access data and actions for which they have permission.

## Key Features

- **Role-Based Access Control (RBAC):** Grants access based on the user's role within an organization. Roles are defined based on authority and responsibility, and users receive permissions according to their assigned role.
- **Attribute-Based Access Control (ABAC):** Utilizes policies that combine attributes (user, resource, environment) to make access decisions, offering more granular control.
- **Discretionary Access Control (DAC):** Allows the owner of the resource to decide who can access specific resources. Access is typically controlled by setting permissions on the resource.
- **Mandatory Access Control (MAC):** Enforces access controls through settings determined by a central authority, based on levels of security clearance.

## How It Works

- **RBAC:** Users are assigned to roles based on their responsibilities. Permissions to perform certain operations are assigned to specific roles. Users acquire permissions by being members of roles.
- **ABAC:** Access decisions are made dynamically by evaluating policies against the attributes of user, action, resource, and context.
- **DAC:** Resource owners assign access rights, which can be inherited by objects created within or added to a system, giving them considerable control over their resources.
- **MAC:** Access to resource information is restricted based on operational and security policies. The system classifies all end users and provides them with labels that permit them to access information at or below their level of security clearance.

## Problem Addressed

Authorization models address the need for precise control over who can access information and perform actions within a system. They help prevent unauthorized access and ensure compliance with security policies, reducing the risk of data breaches and unauthorized data disclosure.

## Implications

Proper implementation of authorization models is essential for securing sensitive information, enforcing data protection laws, and maintaining operational integrity within systems.

## Impact

Effective authorization ensures that the right individuals access the right resources at the right times for the right reasons, aligning with key security and business objectives.

## Defense Mechanisms

- **Policy Enforcement:** Ensures that all access to system resources is governed by policies defined according to the chosen authorization model.
- **Regular Audits:** Monitoring and verifying the correct implementation of access controls to ensure compliance and identify misconfigurations or unauthorized changes.

## Exploitable Mechanisms/Weaknesses

Poor implementation of authorization models or failures in defining access controls can lead to privilege escalation, where users gain higher access rights than intended. Weak policy definitions can also lead to overly permissive access, exposing sensitive information.

## Common Tools/Software

- **Apache Shiro:** A Java security framework that supports authentication, authorization, [[cryptography]], and session management.
- **Microsoft Identity Manager:** Manages digital identities, credentials, and roles, ensuring that they remain up to date and secure across the computing environment.
- **Oracle Entitlements Server:** Provides fine-grained access control through ABAC for applications and services.

## Related Cybersecurity Policies

- **[[NIST Special Publication 800-53]]:** Provides guidelines for implementing access control policies that support different authorization models.
- **ISO/IEC 27001:** Includes requirements for information security management systems (ISMS), stressing the importance of access control.
- **GDPR (General Data Protection Regulation):** Implicates authorization controls in its mandates for data protection, requiring that access to personal data is strictly managed and logged.

## Best Practices

- Implement the least privilege principle to ensure users have only the permissions necessary to perform their tasks.
- Regularly review and update access policies and permissions to adapt to changes in roles, responsibilities, and employment statuses.
- Employ multi-factor authentication to strengthen security measures surrounding access controls.

## Current Status

Authorization models continue to evolve with technological advances and organizational changes. Modern enterprises often adopt hybrid models that combine aspects of RBAC, ABAC, DAC, and MAC to meet complex security requirements effectively.

## Revision History

- **2024-04-14:** Entry created.