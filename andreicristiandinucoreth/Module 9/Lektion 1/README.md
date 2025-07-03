# UE1 - Architecture Decisions

1. Project Requirements Evaluation

- The project requirements for a social media platform are demanding. The need for real-time updates, intensive user interactions, and expected future growth are crucial factors. 

- A social media platform must be able to support up to millions of concurrent users who are constantly interacting, creating, and consuming content. While these core features—user profiles, news feeds, messaging, and real-time notifications—are interdependent, they are also distinct in nature and could be developed and scaled independently. 

- High responsiveness and reliability are key for such a platform, as any outages or delays would directly impact the user experience.


2. Architecture Decision

- Choice: Microservice Architecture

- Scalability: A social media platform requires extreme scalability. With a microservice architecture, individual services (e.g., the news feed service or the notification service) can be scaled independently of each other, depending on where the greatest need lies.

- Agility and independent development: The various features (profiles, news feeds, messaging, notifications) can be developed and deployed by separate teams. This accelerates development cycles and enables faster response to new requirements or bug fixes.

- Resilience: If one service fails (e.g., the messaging service), it doesn't necessarily affect the availability of the other services (e.g., the news feed or profiles). This increases the overall reliability of the platform.

- Real-time requirements: Real-time updates and notifications can be better implemented and isolated using dedicated microservices optimized for high throughput and low latency.

3. Pros and Cons

## Pros

- High Scalability
    - Individual, independent services (e.g., one service for the news feed, another for messaging) can be scaled horizontally as needed. This is crucial for a social media platform that must handle significant growth spurts and peak loads.

- Resilience
    - The failure of a single microservice (e.g., the real-time notification service) does not affect the functionality of the entire platform. Core functions such as displaying user profiles or the news feed remain available.

- Flexibility in technology selection 
    - Different teams can choose the most suitable technologies (programming languages, databases) for their specific microservices. This allows them to respond quickly to new requirements and develop or optimize new features without impacting the entire system. A technology optimized for high performance could be used for real-time notifications, while another might be more suitable for user profiles.

## Cons

- Increased complexity in development and operations
    - Managing many small, distributed services requires more complex infrastructure, monitoring, logging, and deployment processes. This means a higher initial effort for setting up DevOps pipelines and requires experienced staff.

- Distributed Data Management
    - Data is distributed across different services, making it difficult to implemnent methods of sharibg the data across services. Data consistency becomes a very important feature and can pose challenges for critical functions that rely on multiple services interacting.

- Interservice Communication
    - Interservice communication occurs over the network, which can lead to latency issues. Errors in service communication must be handled robustly (e.g., with retries). This is especially critical for real-time functions and news feeds, where large amounts of data from different sources must be aggregated, potentially impacting the overall performance of the platform.

4. Scalability

- Service Granularity and Decoupling:  The platform would be divided into as independent, autonomous services as possible, based on their domain functions (e.g. User Service, Newsfeed Service, Messaging Service, Notification Service). Each service would have its own database to maximize decoupling and enable scalability of data storage.

- Horizontal scaling of each service: Each microservice would be designed as stateless to enable easy horizontal scaling. Container orchestration platforms such as Kubernetes would be used to enable the provisioning, management, and automatic scaling of services based on metrics such as CPU utilization, memory consumption, or network load.

- API Gateway: An API gateway would serve as a single entry point for all external requests. It would route requests to the appropriate microservices, manage high-level authentication and authorization, and potentially perform request shaping or caching. This simplifies communication for clients and conceals the internal complexity of the microservices.

5. Alternative Architectural Considerations

- A monolithic architecture would mean that all functions—user profiles, news feeds, messaging, notifications—would be bundled into a single, large code base and application.

    - Limited scalability: A monolith scales as a whole. If only the news feed service has a high load, the entire application would have to be scaled, which is inefficient and expensive.

    - Lesser development agility: With a monolith, all development teams work on the same code base. This often leads to longer development and testing cycles, as changes in one area could potentially affect the entire system. Deploying new features or bug fixes would be more complex and risky.

    - Lower resilience: The failure of one part of the monolith (e.g., a memory leak in the messaging module) can bring the entire service down. The entire platform would then be offline. 

    - Technological limitations: You are locked into a single technology stack for the entire application. This limits the flexibility to choose the most suitable technologies for specific functions, which is a disadvantage given the diverse requirements of a social media platform (real-time, data processing, UI).


6. Conclusion

- The architectural decision for a microservice architecture is the most suitable choice for a new social media platform with its given requirements – high scalability, real-time interactions, reliability, and the need for future growth. It enables the platform to be developed, operated, and scaled in a modular and flexible manner.

- The challenges of such decisions in real-world software development often lie in the initial complexity and higher overhead for infrastructure and operations. However, for a social media platform, the long-term benefits in terms of scalability, resilience, and development speed far outweigh the initial effort. 