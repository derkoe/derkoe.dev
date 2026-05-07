---
tags: ["ai"]
pubDate: "2026-05-07"
title: "Enterprise Vibe Coding"
author: Christian Köberl
image: "./images/enterprise-vibe-coding.jpg"
summary: "Vibe Coding is gaining traction, but how can it work in an enterprise context? This post explores two approaches—issue-based vibe coding and cloud dev-environments—to enable business people to create integrated, maintainable, and secure applications."
---

The last year has seen a significant increase in the adoption of ["Vibe Coding"](https://en.wikipedia.org/wiki/Vibe_coding). Many business people use this for creating small applications or prototypes. However, these applications are often standalone and not integrated into the larger enterprise ecosystem. This can lead to issues with data consistency, security, and maintainability.

What we need is a way to enable vibe coding in an enterprise context, where users can create applications that are integrated with the larger ecosystem and can be easily maintained and updated. I started calling this idea *Enterprise Vibe Coding*.

There are two main approaches to achieve this:

1. Issue-based vibe coding
   Using Jira, GitHub/Lab issues, etc. to interact with an agent + feature branch deployments to review the results.
2. (Cloud) dev-environment  
   Provide automated (cloud) dev-environments for vibe coding. This is more complex to set up but provides a better vibe coding experience for users.

Let's have a look at both options in more detail.

## Issue-Based Vibe Coding

The idea here is to use an issue tracking system like Jira or GitHub/GitLab issues to interact with an AI agent. Users can create issues describing the task they want the agent to perform, and the agent implements the requested changes in a feature branch. Once the changes are implemented, users can review the results in a deployed environment and provide feedback through the issue tracking system. The feedback is then used to further refine the implementation until the desired outcome is achieved.

The main requirement for this approach is to have a well-defined process for managing feature-branch deployments and the corresponding data and API dependencies. This can be achieved through automation tools and scripts that handle the deployment of feature branches and ensure that the necessary data and API dependencies are available for testing.

This approach is relatively straightforward to implement and can be easily integrated into existing workflows. However, it may not provide the best vibe coding experience for users, as there can be a delay between requesting changes and receiving feedback. Additionally, it may require more manual effort to manage the feature branches and ensure that the changes are properly reviewed and merged.

## (Cloud) Dev-Environment

In this approach, we provide users with an automated development environment including all necessary tools and dependencies. This can be achieved locally using tools like DevContainers or remotely using cloud-based development environments such as GitHub Codespaces, Gitpod, or similar services. The main advantage of this approach is that the user gets immediate feedback on the vibe coding results and can iterate quickly. However, setting up such an environment can be more complex and may require additional resources.

One additional aspect of this setup is the management of test data and API dependencies. In a vibe coding scenario, users may need access to specific datasets or APIs to test their code effectively. This can be managed through the use of mock data, API stubs, or by providing access to real data in a controlled environment.

Overall, while the issue-based approach may be simpler to implement, the (cloud) dev-environment approach offers a more seamless and efficient vibe coding experience for users. It allows for faster iteration and immediate feedback, which can lead to better results and a more enjoyable coding experience.

## Review and Feedback

Regardless of the approach taken, it is crucial to have a robust review and feedback process in place. This is typically done through code reviews, where developers review all changes, adapt them if necessary, and merge them into the main codebase. This process ensures that the changes are of high quality, maintainable, and secure. It also provides an opportunity for developers to learn from each other and improve their coding skills.

## Conclusion

Enterprise Vibe Coding has the potential to revolutionize the way business users create new prototypes and modify existing applications. By providing a more integrated and seamless vibe coding experience, we can empower users to create applications that are not only functional but also maintainable and secure. Whether through issue-based interactions or cloud-based development environments, the key is to ensure that users have the tools and resources they need to succeed in their vibe coding endeavors.
