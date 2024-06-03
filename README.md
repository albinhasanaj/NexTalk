# NexTalk

NexTalk is an upcoming real-time chat application built using Next.js, featuring full-stack capabilities with a focus on modern web technologies. This project is designed to demonstrate real-time communication using WebSockets and includes robust user authentication using GitHub OAuth.

## Features

- **Real-Time Communication**: Built with Socket.IO for efficient real-time interactions. Socket.IO is implemented to facilitate both WebSocket and polling transports, ensuring reliable connectivity across all devices and network conditions.
- **User Authentication**: Integrates GitHub OAuth for streamlined social login, alongside a traditional authentication system where users can sign up using a username, email, and password. Passwords are securely hashed using bcrypt, ensuring sensitive information is safely stored and protected against unauthorized access.
- **Responsive Design**: Optimized for both mobile and desktop platforms.
- **Modern Tech Stack**: Utilizes Next.js, Prisma ORM with MySQL, Tailwind CSS, TypeScript, and Socket.IO.

## Project Objectives

This project is not just a demonstration of technical skills but also a platform for growth and education in the field of web development. Key objectives include:

- **Collaborative Development**: Enhancing our ability to work as a team in a collaborative environment, using tools such as Git for version control and conducting code reviews via GitHub.
- **Skill Enhancement**: Each participant focuses on strengthening their full-stack competencies.
- **Real-World Application**: By building a product intended for real-world use, we tackle the challenges that come with designing functional, user-friendly interfaces and robust backend systems.

## Learning Outcomes

- **Hands-On Experience**: Contributors gain practical experience with a range of technologies and practices, from setting up OAuth with major providers to deploying real-time communication services and using TypeScript and Prisma ORM for robust backend management.
- **Code Reviews and Mentoring**: Regular code reviews and mentoring sessions help in refining skills and understanding complex concepts in software development.
- **Portfolio Development**: This project serves as a key portfolio piece that demonstrates our ability to design, develop, and deploy a full-scale application.

## Technical Stack

- **Backend**: The server logic is written in TypeScript, utilizing Prisma ORM for database handling and interactions. Prisma's robust, type-safe API integrates seamlessly with TypeScript, enhancing our development process with better maintainability and developer productivity.
- **Frontend**: React with Next.js provides a powerful framework for building the user interface, enhanced by Tailwind CSS for styling and responsive design.
- **Authentication**: Utilizes `next-auth` for OAuth authentication, supporting strategies like GitHub and Google for user management.
- **Real-Time Communication**: Managed through Socket.IO, enabling both message broadcasting and direct user communication in real time.
- **State Management**: Zustand is used for simple, hook-based state management without Redux's complexity.

## Dependencies Overview

The `package.json` file specifies all project dependencies necessary to build and run NexTalk. Key dependencies include:

- **Next.js and React**: Framework and library for building the user interface.
- **Socket.IO**: Enables real-time, bidirectional event-based communication.
- **Prisma**: ORM used for server-side database interactions.
- **TypeScript**: Used for writing type-safe code to reduce runtime errors and improve maintainability.
- **Tailwind CSS and DaisyUI**: For modern, responsive designs.

For a full list of dependencies and their versions, refer to the project's `package.json` file. This ensures that every aspect of our application aligns with current industry standards and best practices.
