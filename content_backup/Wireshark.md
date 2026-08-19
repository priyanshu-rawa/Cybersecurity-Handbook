up:: [[Hacking Toolkit]]
# Wireshark

Wireshark is an open-source packet analyzer used for network troubleshooting, analysis, software and communications protocol development, and education. It captures network packets in real-time and displays them in human-readable format for analysis.

## Key Features

- **Deep Packet Analysis:** Allows detailed inspection of the data part of a packet at a microscopic level, which can include protocol dissecting and decoding.
- **Real-Time Capture and Offline Analysis:** Supports live traffic capture as well as analysis of existing capture files.
- **Filtering Capabilities:** Features powerful filters that enable users to isolate traffic by specific criteria, such as IP address, protocol type, or port numbers.
- **Color Coding:** Utilizes color-coded packet displays to help users identify packet types quickly.
- **Extensive Protocol Support:** Provides support for hundreds of protocols at various network layers.

## How It Works

Wireshark captures network traffic on Ethernet, Bluetooth, Wireless (IEEE.802.11), and more, at the packet level. It taps into the data flowing across the network, capturing each packet and then decoding and presenting it as detailed information about the packet's source, destination, protocol employed, and other relevant data.

## Advantages

- **Cost-Effective:** Being open-source, it is freely available for anyone to use, making it an economical choice for network analysis.
- **Flexibility:** Supports a wide range of operating systems including Windows, macOS, and Linux.
- **Comprehensive Troubleshooting Tool:** Enables detailed examination of network problems, performance analysis, and software debugging.
- **Educational Tool:** Acts as a practical learning tool for understanding network protocols and packet structures.

## Related Cybersecurity Policies

- **[[General Data Protection Regulation (GDPR)|GDPR]] Compliance:** When used in networks handling personal data, Wireshark must be employed in compliance with [[General Data Protection Regulation (GDPR)]] guidelines to ensure that personal data is captured and analyzed lawfully.
- **[[PCI DSS]]:** For networks handling credit card transactions, Wireshark usage must comply with Payment Card Industry Data Security Standards ([[PCI DSS]]) for capturing and analyzing packet data securely.

## Documentation and Tutorials

- **Official Documentation:** Available on the Wireshark website, this documentation provides comprehensive details on all features and how to use Wireshark effectively.
- **Online Tutorials:**
    - Wireshark User's Guide
    - Wireshark Network Analysis Study Guide
    - YouTube Tutorials by Wireshark University and other community contributors offer visual and practical guides to mastering Wireshark.

## Best Practices

- Regularly update to the latest version to utilize new features and security patches.
- Use capture filters to reduce the volume of data and focus on relevant traffic, enhancing analysis efficiency.
- Ensure sensitive data is handled and stored securely to comply with privacy laws and standards.

## Current Status

Wireshark continues to be developed and updated by a global community of networking experts and software developers. It remains the de facto standard for network packet analysis in both educational and professional settings.

## Revision History

- **2024-04-23:** Entry created.