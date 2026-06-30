---
aliases:
  - Tor
  - The Onion
  - The Onion Router
  - Tor Browser
---
up:: [[Cybersecurity Ethics and Privacy]]
# Tor Network

The Tor Network, short for "The Onion Router," is a free and open-source software for enabling anonymous communication across a distributed network. It routes Internet traffic through a worldwide volunteer overlay network consisting of more than seven thousand relays, designed to conceal a user's location and usage from anyone conducting network surveillance or traffic analysis.

## How It Works

- **Onion Routing:** Tor encrypts the data, including the next node destination, multiple times and sends it through a series of relays. Each relay decrypts a layer of [[encryption]] to reveal only the next relay in the path. This prevents these intermediaries from knowing the origin, destination, and contents of the data.
- **Entry/Exit Nodes:** The network traffic enters the Tor network via an entry (guard) node and exits through an exit node. The entry node knows the user's IP but not the final destination, while the exit node knows the final destination but not the user's IP.
- **Circuit Creation:** Tor creates a circuit of encrypted connections through multiple nodes. Each session randomly selects these nodes, and the circuits change periodically to increase security and anonymity.

## Common Techniques Used

- **Web Browsing:** Users access the internet through the Tor Browser, which is configured to route traffic through the Tor network, enhancing privacy and circumventing censorship.
- **Hidden Services:** Websites and services that are only accessible through the Tor network. They use ".onion" addresses and offer privacy for both users and providers.
- **Secure Messaging:** Tor supports anonymous messaging services, allowing users to communicate without revealing their identities or locations.

## Advantages

- **Anonymity:** Provides anonymity to users and service providers, protecting their identities and activities from surveillance and traffic analysis.
- **Censorship Circumvention:** Enables users to bypass government censorship, accessing the internet freely.
- **Privacy Protection:** Helps users avoid being tracked by websites, ISPs, and other entities that might collect personal data.
- **Safe Communication:** Offers a safer communication channel for whistleblowers, activists, and journalists working under oppressive regimes or dangerous situations.

## Related Cybersecurity Policies

- **Data Protection and Privacy Laws:** While Tor itself is not governed by specific policies, its usage is influenced by national and international laws concerning data protection, surveillance, and internet governance.
- **Network Surveillance Regulations:** Various countries have regulations regarding the use of anonymity services like Tor, with some governments restricting or monitoring its use due to concerns over illegal activities.

## Best Practices

- **Use HTTPS:** Always use HTTPS while browsing with Tor to ensure end-to-end [[encryption]], as exit nodes can intercept traffic sent to non-HTTPS sites.
- **Avoid Personal Accounts:** Do not access personal accounts (e.g., email, banking) that could de-anonymize your Tor session.
- **Keep Tor and Related Software Updated:** Regularly update the Tor Browser and other related software to protect against security vulnerabilities.

## Current Status

The Tor Network continues to evolve, with ongoing development aimed at improving security, usability, and speed. It remains a critical tool for privacy advocates, though it faces challenges such as blocking efforts by state [[firewalls]] and the potential misuse by malicious actors.

## Revision History

- **2024-04-14:** Entry created.