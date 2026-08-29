# Social-Networking Database: Textual ER Model

## Entities

- **User**
- **Post**
- **FriendRequest**
- **Like**

## Relationships

- **User creates Posts**  
  *Relationship:* User (1) → Post (N)

- **User sends FriendRequests to another User**  
  *Relationship:* User (N) → User (N) via FriendRequest

- **User likes Posts**  
  *Relationship:* User (1) → Like (N)  
  *Relationship:* Post (1) → Like (N)

## Description

- Users can create multiple Posts.  
- Users can send FriendRequests to other Users.  
- Users can like Posts.  
- Each Like belongs to exactly one User and exactly one Post.
