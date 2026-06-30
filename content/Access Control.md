up:: [[Network Security]]
 
# Access Control

Access Control is a security technique that regulates who or what can view or use resources in a computing environment. It is a fundamental concept in security, ensuring that only authorized users or systems have access to specific resources, data, or services.

## Key Features  

1. **Authentication**: The process of verifying the identity of a user or system before granting access.
2. **Authorization**: The process of granting or denying access to resources based on the user's credentials or identity.
3. **Types of Access Control Models**:
   - **[[Discretionary Access Control (DAC)]]**: Access is based on the identity of the requestor and access rules stated by the owner.
   - **[[Mandatory Access Control (MAC)]]**: Access is determined by a central authority based on multiple levels of security.
   - **[[Role-Based Access Control (RBAC)]]**: Access decisions are based on the roles that individual users have as part of an organization.
   - **[[Attribute-Based Access Control (ABAC)]]**: Access decisions are based on attributes (e.g., user attributes, resource attributes, environment attributes).
4. **[[Least Privilege Principle]]**: Users are given the minimum levels of access – or permissions – needed to perform their job functions.
5. **[[Access Control Lists (ACLs)]]**: Lists that specify which users or system processes are granted access to objects, as well as what operations are allowed on given objects.

## Problem Addressed  

Access Control addresses the problem of unauthorized access to sensitive information or systems. It is a critical mechanism for ensuring data privacy, security, and integrity by restricting access to authorized individuals and preventing breaches or misuse of data.

## Implications  

- **Data Protection**: Proper implementation of access control is crucial for safeguarding sensitive data against unauthorized access or breaches.
- **Regulatory Compliance**: Many regulatory standards and frameworks, such as [[General Data Protection Regulation (GDPR)|GDPR]], [[Health Insurance Portability and Accountability Act (HIPAA)|HIPAA]], and PCI-DSS, require robust access control measures to ensure data protection.
- **Operational Efficiency**: By ensuring that users only have access to the resources necessary for their roles, access control helps maintain organizational efficiency and security.

## Impact  

- **Improved Security Posture**: A well-implemented access control system minimizes the risk of data breaches, insider threats, and cyber attacks.
- **Reduced Risk of Data Leakage**: Ensures sensitive information is only accessible to those with the proper authorization, reducing the likelihood of data leakage.
- **Enhanced Trust and Reputation**: Organizations with strong access control practices are more likely to maintain trust and reputation with clients and stakeholders.

## Defense Mechanisms  

1. **[[Multi-Factor Authentication (MFA)]]**: Strengthening the authentication process by requiring multiple forms of verification (e.g., password and biometric).
2. **Regular Audits and Monitoring**: Continuous monitoring and regular audits of access logs to detect and respond to unauthorized access attempts.
3. **Access Reviews**: Periodic reviews of user access levels to ensure compliance with the principle of least privilege.
4. **Segmentation of Networks and Data**: Isolating sensitive data and systems to minimize the impact of a potential breach.
5. **[[Encryption]]**: Encrypting data at rest and in transit to protect it from unauthorized access even if it is intercepted.

## Exploitable Mechanisms/Weaknesses  

1. **Weak or Stolen Credentials**: Inadequate password policies or [[phishing]] attacks can lead to compromised credentials.
2. **Over-privileged Access**: Granting users more access than necessary increases the risk of insider threats or accidental data breaches.
3. **Misconfigured Access Control**: Incorrect configurations can inadvertently expose sensitive data or systems to unauthorized users.
4. **Lack of Monitoring and Auditing**: Failure to monitor access logs can allow unauthorized access to go undetected.

## Common Tools/Software  

- **Active Directory (AD)**: A directory service developed by Microsoft for Windows domain networks that is widely used for access control in enterprise environments.
- **Okta**: A cloud-based identity management solution that provides secure user authentication.
- **Duo Security**: Provides two-factor authentication and multi-factor authentication solutions.
- **AWS Identity and Access Management (IAM)**: A tool for managing access to AWS services and resources securely.
- **Azure Active Directory (AAD)**: Microsoft's cloud-based [[identity and access management]] service.

## Current Status  

Access control continues to evolve with advancements in technology and emerging security threats. The adoption of Zero Trust Architecture, which assumes no user or device is trusted by default, has shifted the approach to access control, emphasizing continuous verification and minimal privileges. Organizations are increasingly adopting Attribute-Based Access Control (ABAC) for more granular and dynamic access policies, and moving towards identity as the new security perimeter.

## Revision History  

- **September 2024**: Entry added.
