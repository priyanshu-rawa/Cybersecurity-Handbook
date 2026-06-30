up:: [[Network Security]]
# [[Intrusion Detection Systems]] ([[Intrusion Detection Systems|IDS]]) and [[Intrusion Prevention Systems]] ([[Intrusion Prevention Systems|IPS]])

[[Intrusion Detection Systems]] ([[Intrusion Detection Systems|IDS]]) are systems designed to detect unauthorized access or breaches in a network and alert administrators. [[Intrusion Prevention Systems]] ([[Intrusion Prevention Systems|IPS]]), on the other hand, not only detect but also take preventive measures to block or mitigate these threats.

## Key Features

- **[[Intrusion Detection Systems|IDS]] Features:**
    
    - Signature-Based Detection: Uses known patterns of unauthorized behavior to detect attacks.
    - Anomaly-Based Detection: Identifies deviations from a normal baseline to spot potential threats.
    - Passive Detection: Monitors network traffic without altering it, providing alerts for potential threats.
- **[[Intrusion Prevention Systems|IPS]] Features:**
    
    - Active Prevention: Takes direct actions to prevent detected threats from harming the network.
    - Inline Traffic Inspection: Sits directly in the line of network traffic, analyzing and taking action on all traffic that passes through.
    - Automated Responses: Configured to automatically respond to detected threats to prevent damage without human intervention.

## Differences Between [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]]

- **Detection vs. Prevention:** [[Intrusion Detection Systems|IDS]] is primarily about detecting and alerting, whereas [[Intrusion Prevention Systems|IPS]] goes a step further to prevent the threat from succeeding.
- **Passive vs. Active Role:** [[Intrusion Detection Systems|IDS]] operates passively, monitoring and reporting activities without affecting the network traffic. [[Intrusion Prevention Systems|IPS]] actively analyzes and modifies the network traffic by blocking, redirecting, or correcting it before it reaches its destination.
- **Deployment Position:** [[Intrusion Detection Systems|IDS]] can be deployed outside the network to monitor incoming and outgoing traffic. [[Intrusion Prevention Systems|IPS]] is usually placed inline to intercept and act on all traffic flows.

## Problem Addressed

Both [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] are crucial for maintaining robust [[network security]]. [[Intrusion Detection Systems|IDS]] helps in identifying potential security breaches and threats, while [[Intrusion Prevention Systems|IPS]] acts to prevent identified threats from damaging the network.

## Implications

The implementation of [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] enhances [[network security]] but also introduces complexity in management and requires careful tuning to balance security and network performance.

## Impact

[[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] significantly bolster [[network security]] protocols by adding layers of detection and prevention, crucial for defending against increasingly sophisticated cyber attacks.

## Defense Mechanisms

- **[[Intrusion Detection Systems|IDS]]:**
    - Integration with broader security management systems to enhance alert accuracy.
    - Regular updates to detection algorithms and signature databases.
- **[[Intrusion Prevention Systems|IPS]]:**
    - Stringent real-time traffic analysis and active blocking measures.
    - Continuous updates and adaptive response strategies to new threats.

## Exploitable Mechanisms/Weaknesses

[[Intrusion Detection Systems|IDS]] may generate false positives and false negatives, leading to overlooked threats or unnecessary alarms. [[Intrusion Prevention Systems|IPS]] may incorrectly block legitimate traffic, potentially disrupting normal business operations.

## Common Tools/Software

- **[[Intrusion Detection Systems|IDS]] Tools:** Snort, Suricata, Security Onion.
- **[[Intrusion Prevention Systems|IPS]] Tools:** Cisco Firepower, Palo Alto Networks Next-Generation [[Intrusion Prevention Systems|IPS]], Fortinet FortiGate.

## Best Practices

- Keep both [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] systems regularly updated with the latest security patches and threat definitions.
- Regularly audit and tune the configuration to minimize false positives and negatives.
- Integrate [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] with other security measures for a comprehensive security posture.

## Current Status

The fields of [[Intrusion Detection Systems|IDS]] and [[Intrusion Prevention Systems|IPS]] are evolving with advancements in artificial intelligence and machine learning, enhancing their predictive capabilities and effectiveness in real-time threat detection and prevention.

## Revision History

- **2024-04-14:** Entry created.