up:: [[Dark Web]]
# Freenet

Freenet is a decentralized, peer-to-peer network designed to enable anonymous and censorship-resistant communication and publishing. It uses a distributed data store to keep and deliver information while protecting the identity of both the data provider and the user.

## How It Works

- **Data Storage and Retrieval:** Freenet stores data in a distributed manner across all nodes in the network. Data is split into chunks and encrypted before being stored on various nodes. When data is requested, Freenet retrieves it through a pathway that obscures which user requested the information.
- **Key-Based Retrieval:** Each piece of content on Freenet has a unique key. There are two types of keys: content-hash keys (CHK), which are based on the content itself, and signed-subspace keys (SSK), which are used for mutable content where updates can be made by the owner.
- **Darknet and Opennet Modes:** Users can connect in 'Opennet' mode where they connect to almost anyone, or 'Darknet' mode, where users connect only to those they trust personally, enhancing security and anonymity.

## Advantages

- **Censorship Resistance:** Due to its decentralized and anonymous nature, it is extremely difficult for external entities to censor or restrict access to content.
- **Anonymity:** Provides high levels of anonymity for both publishers and users, as it does not require IP addresses for data exchange.
- **Resilience:** The network is highly resilient to attacks and failures because information is replicated across multiple nodes.
- **Free to Use:** There are no charges for using the network, making it accessible to anyone anywhere.

## Exploitable Mechanisms/Weaknesses

- **Performance Issues:** Due to its high levels of [[encryption]] and routing data through multiple nodes, Freenet can be slower than traditional web services.
- **Storage Space:** Requires a significant amount of storage space on each node, as data is replicated across the network to ensure availability and redundancy.
- **Complex User Experience:** Can be less user-friendly compared to more centralized services due to the complexities of maintaining anonymity and security.

## Common Tools/Software

- **Freenet Software:** The primary tool for participating in the Freenet network is the Freenet software itself, which users must install to connect to the network.
- **FProxy:** Integrated into the Freenet software, this browser-based interface allows users to access content stored on the Freenet network.
- **Freemail:** A plugin for Freenet that provides anonymous email functionality.

## Related Cybersecurity Policies

- **Data Protection Laws:** While not directly regulated, Freenet must be used in ways that comply with national and international data protection laws, particularly if personal data is being shared over the network.
- **Network [[Surveillance]] Regulations:** In some countries, the use of networks like Freenet may be scrutinized under laws related to network [[surveillance]] and anti-terrorism, given its potential for anonymous communication.

## Current Status

Freenet continues to be developed and maintained by a dedicated community of volunteers committed to privacy and freedom of information. Ongoing improvements focus on enhancing security features, increasing usability, and optimizing performance.

## Revision History

- **2024-04-14:** Entry created.