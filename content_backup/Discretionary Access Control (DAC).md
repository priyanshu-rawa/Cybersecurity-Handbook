---
aliases:
  - Discretionary Access Control
  - DAC
---
up:: [[Access Control]]

# Discretionary Access Control (DAC)

Discretionary Access Control (DAC) is an [[access control]] model where the owner of a resource, such as a file or folder, has the authority to determine who can access it and what level of access they have. DAC relies on the identity of the users and groups to decide access permissions, allowing the owner complete discretion over the resource.

## Key Features  

1. **Owner-Driven Control**: The resource owner decides who has access and what permissions (e.g., read, write, execute) are granted.
2. **Identity-Based Access**: Access rights are assigned based on the user's identity or membership in a group.
3. **Flexibility**: Users can share their resources with other users freely, providing flexibility in a collaborative environment.
4. **Access Control Lists (ACLs)**: Often implemented using ACLs, which define the permissions attached to a file or resource for different users.
5. **Lack of Central Authority**: Unlike other models (e.g., MAC), DAC does not involve a centralized authority or policy enforcement.

## Problem Addressed  

DAC addresses the need for flexible and straightforward access control in environments where users need autonomy to manage their resources. It allows users to easily share files and data, fostering collaboration and productivity in a less restrictive environment.

## Implications  

- **Ease of Use**: DAC is straightforward and user-friendly, making it easy for resource owners to manage access.
- **Security Risks**: Flexibility in access control may lead to unintended access permissions, potentially exposing resources to unauthorized users.
- **Not Suitable for High-Security Environments**: DAC's lack of centralized control makes it unsuitable for environments requiring stringent security controls, such as government or military applications.

## Impact  

- **Enhanced Collaboration**: By allowing users to control access to their resources, DAC fosters a collaborative environment where sharing is easy and encouraged.
- **Potential for Misconfiguration**: The ease of assigning permissions can lead to accidental misconfigurations, creating security vulnerabilities.
- **Difficulty in Managing Access at Scale**: In large organizations, managing access rights manually for numerous users and resources can become cumbersome and error-prone.

## Defense Mechanisms  

1. **User Training**: Educating users on the importance of setting correct permissions and understanding the implications of their choices.
2. **Periodic Access Reviews**: Regularly reviewing access permissions to ensure they are still appropriate and have not been overly permissive.
3. **Auditing and Logging**: Implementing robust auditing and logging mechanisms to detect and respond to unauthorized access attempts or changes in permissions.
4. **Limiting Privileges**: Encouraging the principle of least privilege, even within a DAC model, to minimize unnecessary access.

## Exploitable Mechanisms/Weaknesses  

1. **Propagation of Permissions**: Users may inadvertently propagate excessive permissions to unauthorized individuals, leading to a breach.
2. **Lack of Oversight**: Absence of centralized oversight can result in inconsistent and insecure access controls.
3. **Insider Threats**: Users with extensive access rights may misuse their privileges, either intentionally or accidentally.
4. **Inconsistent Application of Security Policies**: Users may not apply organizational security policies uniformly, increasing the risk of security breaches.

## Common Tools/Software  

- **Windows File Sharing**: Uses DAC to control access to files and folders on shared drives.
- **Unix/Linux File Systems**: DAC is the default model for most Unix and Linux file systems, using permissions and user groups.
- **SQL Databases**: DAC can be implemented in databases by granting specific users or roles permissions to access or manipulate data.

## Current Status 

Discretionary Access Control remains widely used in environments where ease of collaboration and user autonomy are prioritized over stringent security requirements. However, it is increasingly supplemented with other models, such as Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC), to balance flexibility with enhanced security measures. The rise of Zero Trust models has also encouraged organizations to rethink the use of purely discretionary models in favor of more robust security frameworks.

## Revision History

- **August 2024**: This is a new entry.
