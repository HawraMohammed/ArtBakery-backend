# Art Bakery Project

## Live Demo:
- Link for the frontend repo: [frontend link](https://github.com/HawraMohammed/ArtBakery-frontend)

## Features:
## Screenshots:
## Technologies:
- Git,Github,Express.js,Node.js,React,Bootstrap,Postman(for testing purposes),MongoDB
## Attributions:

# Planning phase:

## User Scenarios:
### User(1): admin
- As an admin, I must be able to create,view,edit,and delete posts about my work
- As an admin, I must be able to accept/reject requests, and I only take two orders per week (ready-made seasonal orders excluded)
- As an admin, I must be able to update the price of the order, after I negotiate with the customer in an external text messages platform (ready-made seasonal orders excluded) and update payment status after he pay

**future improvements**:
- As an admin, I must be able to create,view,edit,and delete ready-made seasonal boxes
- As an admin, I must be able to delete orders of useres who ordered ready-made seasonal boxes but never communicate to approve their orders in an external text messages platform 

### User(2): customer
- As a customer I must be able to create,view,edit,and delete requests I made
- As a customer I must be able to view,and delete orders I got accepeted to
- As a customer I must be able to create,view,edit,and delete comments of any post

**future improvements**:
- As a customer, I must be able to view ready-made seasonal boxes and order at least one box
- As a customer, I must be able to update quantity of boxes in my ready-made seasonal orders

## Entity Relationship Diagram (ERD):
![ERD](/public/images/ArtBakeryERD.drawio.png)
## Wireframes (initial prototypes):
![prototypes](/public/images/prototypes-image.png)
## Routes:
<table>
  <tr>
    <th>Model</th>
    <th>Method</th>
    <th>Route</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="3">User & auth related process</td>
    <td>POST</td>
    <td>/auth/sign-up</td>
    <td>Create a new account for user</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/sign-in</td>
    <td>Login to the user account</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/protected</td>
    <td>Get current user's payload</td>
  </tr>
  <tr>
    <td rowspan="5">Request</td>
    <td>POST</td>
    <td>/requests</td>
    <td>Create a new request to order</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/requests/:requestId</td>
    <td>update the created request info</td>
  </tr>
    <tr>
    <td>GET</td>
    <td>/requests</td>
    <td>view all created requests</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/requests/:requestId</td>
    <td>view the created request info</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/requests/:requestId?action=(accept,reject,withdraw)</td>
    <td>accept/reject request (admin) withdraw the created request info(customer)</td>
  </tr>
  <tr>
    <td rowspan="4">Order</td>
    <td>PATCH</td>
    <td>/orders/:orderId</td>
    <td>update the order's price and payment status(admin) *price is determined after negotiation*</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/orders/:orderId</td>
    <td>view the order info</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/orders</td>
    <td>view all orders</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/orders/:orderId</td>
    <td>delete the order(customer and admin)</td>
  </tr>
  <tr>
    <td rowspan="5">Post</td>
    <td>POST</td>
    <td>/posts</td>
    <td>create a new post (admin)</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/posts/:postId</td>
    <td>update the post info (admin)</td>
  </tr>
    <tr>
    <td>GET</td>
    <td>/posts</td>
    <td>view all posts created by the admin</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/posts/:postId</td>
    <td>view details of a particular post</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/posts/:postId</td>
    <td>delete the post(admin)</td>
  </tr>
   <tr>
    <td rowspan="4">Comment</td>
    <td>POST</td>
    <td>/posts/:postId/comments</td>
    <td>Create a new comment of a post</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/posts/:postId/comments/:commentId</td>
    <td>update the created comment info</td>
  </tr>
    <tr>
    <td>GET</td>
    <td>/posts/:postId/comments</td>
    <td>view all created comments</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/posts/:postId/comments/:commentId</td>
    <td>delete the created comment</td>
  </tr>
  <tr>
    <td rowspan="6">Seasonal</td>
    <td>POST</td>
    <td>/seasonals</td>
    <td>create a new seasonal sales</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/seasonals/:seasonalId</td>
    <td>update the seasonal info</td>
  </tr>
    <tr>
    <td>GET</td>
    <td>/seasonals</td>
    <td>view all seasonal sales created</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/seasonals/:seasonalId</td>
    <td>view details of a particular seasonal sale</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/seasonals/:seasonalId</td>
    <td>delete the seasonal sale</td>
  </tr>
    <tr>
    <td>PATCH</td>
    <td>/seasonals/:seasonalId</td>
    <td>order a seasonal box by the customer therefore update quantity + create new pending order </td>
  </tr>
  </table>

## Components heirarchy:
![components](/public/images/Components.png)