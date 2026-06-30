---
aliases:
  - Distributed Denial of Service
  - DDoS
---
up:: [[Threat Landscape]]
# Distributed Denial of Service (DDoS)

A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic. DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic. Exploited machines can include computers and other networked resources such as IoT devices. The sheer scale of these attacks separates them from simple DoS (Denial of Service) attacks, making them more challenging to mitigate.

## Key Features

- **Volume-Based Attacks**: Increase in traffic overwhelms the bandwidth of the target.
- **Protocol Attacks**: Exploit weaknesses in layer 3 and layer 4 protocol stacks to disrupt communication.
- **Application Layer Attacks**: Target web applications with the intention of exhausting the resources.
- **Multi-Vector Attacks**: Utilize multiple attack vectors simultaneously to disrupt the service.

## Problem Addressed

DDoS attacks are designed to take websites, services, or networks offline or make them inaccessible to legitimate users. They can be motivated by various reasons, including extortion, political activism, or as a smokescreen for other malicious activities. By disrupting services, attackers can cause significant damage to businesses, institutions, and individuals relying on online platforms.

## Implications

The implications of a successful DDoS attack include financial losses due to downtime, damage to brand reputation, loss of customer trust, and potentially, the exposure of vulnerabilities that could be exploited in further attacks. For critical services, such as healthcare and financial services, the consequences can extend to public safety and economic stability.

## Impact

- **Operational Disruption**: DDoS attacks can halt operations, affecting businesses and users who depend on online services.
- **Economic Loss**: Businesses may incur significant losses due to downtime, lost transactions, and recovery costs.
- **Reputational Damage**: Persistent or high-profile DDoS attacks can undermine confidence in a service or institution.
- **Secondary Attacks**: DDoS can be a diversion for more intrusive attacks, such as data breaches.

## Defense Mechanisms

- **Traffic Analysis and Filtering**: Identifying and filtering out malicious traffic before it reaches the target.
- **Rate Limiting**: Controlling the amount of traffic a server accepts to prevent overload.
- **Redundancy**: Distributing network resources across multiple locations to dilute the effect of an attack.
- **DDoS Mitigation Services**: Specialized services that detect and mitigate large-scale DDoS attacks.

## Exploitable Mechanisms/Weaknesses

- **Inadequate Security Posture**: Poorly secured network devices and infrastructure can be easily compromised and used in DDoS attacks.
- **Lack of Capacity Planning**: Networks without the capacity to handle sudden spikes in traffic are more vulnerable to DDoS attacks.
- **Unprotected IoT Devices**: IoT devices with default passwords and configurations can be hijacked and used as part of a botnet for DDoS attacks.

## Current Status

DDoS attacks continue to evolve, growing in complexity, volume, and sophistication. The advent of massive IoT botnets has increased the potential scale of attacks, making it crucial for organizations to adopt comprehensive security measures and collaborate with ISPs and DDoS mitigation services for protection.

## Revision History

- **2024 Update**: Added
