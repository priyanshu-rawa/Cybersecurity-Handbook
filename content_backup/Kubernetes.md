---
aliases:
  - K8s
---

# Kubernetes (K8s)

Kubernetes, also known as K8s, is an open-source platform designed to automate the deployment, scaling, and operation of application containers. Developed by Google and later donated to the Cloud Native Computing Foundation, Kubernetes provides a framework for running distributed systems resiliently, allowing for scaling and failover for your application, providing deployment patterns, and more. It aims to facilitate both declarative configuration and automation, simplifying the management of containerized applications in various environments, including physical, virtual, cloud-based, and hybrid systems.

## Key Features

- **Automated Rollouts & Rollbacks:** Kubernetes progressively rolls out changes to your application or its configuration while monitoring application health to ensure it doesn't kill all your instances at the same time.
- **Service Discovery and Load Balancing:** Kubernetes can expose a container using the DNS name or an IP address. If traffic to a container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
- **Storage Orchestration:** Kubernetes allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers, and more.
- **Self-healing:** Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
- **Secret and Configuration Management:** Kubernetes lets you store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys. You can deploy and update secrets and application configuration without rebuilding your container images and without exposing secrets in your stack configuration.

## Implications

Kubernetes has dramatically changed the landscape of deployment and management of applications. It offers a platform that not only facilitates high availability, scalability, and disaster recovery but also fosters innovation and rapid development. It supports a [[microservices architecture]], making it easier to package, deploy, and manage scalable and portable applications. However, it also introduces a layer of complexity in the system, requiring skilled personnel to manage and operate the cluster.

## Current Status

Kubernetes has established itself as the de facto standard for container orchestration and management. It enjoys robust community support and contributions, with major cloud service providers like AWS, Google Cloud, and Microsoft Azure offering managed Kubernetes services. Continuous improvements and feature additions are being made to make the platform more accessible, secure, and efficient.

## Related Concepts

- [[Docker Containers]] - The primary containerization platform used in conjunction with Kubernetes for packaging and running applications.
- [[Microservices Architecture]] - An architectural style that Kubernetes supports, enhancing its deployment, scaling, and management.
- [[DevOps]] - A set of practices that Kubernetes enhances, enabling continuous integration and continuous deployment (CI/CD) of applications.
- [[Cloud Native Computing Foundation (CNCF)]] - The foundation that governs Kubernetes and fosters its growth alongside other cloud-native technologies.

## Important People

- **Joe Beda, Brendan Burns, and Craig McLuckie** - Recognized as the co-founders of Kubernetes while working at Google, they were instrumental in its development and subsequent open-sourcing.
- **Kelsey Hightower** - A prominent advocate and educator in the Kubernetes community, known for his extensive work in helping people understand and use Kubernetes effectively.

Kubernetes continues to pave the way for a future where containerized applications can be deployed and managed seamlessly across various environments, driving the evolution of cloud-native landscapes and bolstering the capabilities of [[DevOps]] teams worldwide.