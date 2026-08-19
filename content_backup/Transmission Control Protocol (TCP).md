---
aliases:
  - Transmission Control Protocol
  - TCP
---
up:: [[Nmap]]
# Transmission Control Protocol (TCP)

Transmission Control Protocol (TCP) is a core protocol of the Internet Protocol Suite. It operates at the transport layer and provides reliable, ordered, and error-checked delivery of a stream of data between applications running on hosts communicating via an IP network.

## How It Works

TCP works by establishing a connection between sender and receiver before data transmission begins. Data is transmitted in segments, and each segment contains a sequence number, which allows the receiver to reorder segments and detect any missing data. TCP uses acknowledgments (ACKs) to confirm receipt of segments, and it implements a retransmission strategy for any data that is not acknowledged. Flow control is managed through windowing, and congestion control is maintained by adjusting the rate of data transfer to prevent network overload.

## Key Features

- **Connection-Oriented:** TCP establishes a connection before data transfer and maintains it until the communication is complete.
- **Reliability:** Automatically resends data if it does not reach the receiver.
- **Ordered Data Transfer:** Ensures data segments are reassembled in order, regardless of the order they were received.
- **Error Checking:** Uses checksums to verify the integrity of each data segment.
- **[[TCP Message Types]]**: There are different types of messages.

## Advantages

- **Reliable Communication:** Ensures complete data transfer with error checking and correction.
- **Data Segmentation:** Breaks down data into manageable segments, making data handling more efficient over networks.
- **Flow Control:** Prevents network congestion by adjusting the rate of data transmission based on the receiver's ability to process data.

## Helpful Beginner Tips

- **Understand the Basics:** Start with learning how TCP/IP networks operate, focusing on the role of TCP in ensuring data reliability and order.
- **Use Network Analysis Tools:** Tools like [[Wireshark]] can help visualize TCP traffic, offering a practical understanding of how TCP connections are established, maintained, and terminated.
- **Experiment with Socket Programming:** Building simple client-server applications using TCP sockets can provide hands-on experience with TCP’s operations.

## Exploitable Mechanisms/Weaknesses

- **TCP Sequence Prediction:** Attackers can hijack sessions if they can predict the sequence numbers used in a TCP session.
- **Denial of Service (DoS) Attacks:** TCP connections can be overwhelmed by flooding them with excessive requests, leading to service disruptions.
- **Man-in-the-Middle (MitM) Attacks:** Without [[encryption]], TCP communications are susceptible to eavesdropping and data manipulation.

## Related Cybersecurity Policies

- **RFC 5961,** "Improving TCP's Robustness to Blind In-Window Attacks": This policy outlines enhancements to TCP's security features to mitigate the risks from certain types of network attacks.
- **[[NIST Cybersecurity Framework|NIST Guidelines]] on [[Firewalls]] and Firewall Policy:** Provides recommendations for securing TCP connections through proper [[Firewalls|firewall]] configurations and policies.

## Revision History

- **2024-04-23:** Entry created.

