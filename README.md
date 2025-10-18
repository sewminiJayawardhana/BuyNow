# BuyNow - E-commerce Platform

![BuyNow Logo](client/src/assets/logo.png)

BuyNow is a modern, full-stack e-commerce platform focused on providing sustainable and eco-friendly products to conscious consumers. The platform offers a seamless shopping experience with features like product categorization, shopping cart functionality, secure online payments, and order management.

## Purpose

BuyNow aims to:

- Connect environmentally conscious consumers with sustainable products
- Provide a streamlined shopping experience with intuitive UI/UX
- Support both COD (Cash on Delivery) and online payment methods
- Offer a seller dashboard for vendors to manage their eco-friendly products
- Create a transparent marketplace that highlights sustainable practices

## Technologies Used

### Frontend
- **React.js**: Modern UI library for building interactive user interfaces
- **Context API**: State management for application-wide data flow
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Next-generation frontend tooling for faster development

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Web application framework for handling routes and middleware
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM library for MongoDB and Node.js

### Authentication & Security
- **JWT (JSON Web Tokens)**: For secure user authentication
- **bcrypt.js**: Password hashing for enhanced security
- **Cookie-based Authentication**: For persistent login sessions

### Payment Processing
- **Stripe**: Secure payment gateway integration for online transactions
- **Webhook Integration**: For real-time payment status updates

### Image Management
- **Cloudinary**: Cloud-based image storage and manipulation

## Screenshots

Home page
![Home page](client/src/assets/screenshots/img1.png)

Cart page
![Cart page](client/src/assets/screenshots/img2.png)

Address adding page
![Add Address page](client/src/assets/screenshots/img3.png)

My Orders page
![My Orders page](client/src/assets/screenshots/img4.png)

All Products
![All Products page](client/src/assets/screenshots/img7.png)

Seller Dashboard - Add Product
![Seller - Add Product](client/src/assets/screenshots/img6.png)

Seller Dashboard - Availability & Item Status
![Seller - Availability and Status](client/src/assets/screenshots/img5.png)






## Key Features

### User Interface Highlights
- **Dynamic Product Carousel**: Showcasing featured products with smooth animations
- **Category Navigation**: Intuitive product filtering by categories
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Mode Toggle**: Customizable viewing experience
- **Real-time Cart Updates**: Dynamic cart functionality with quantity adjustments

### Functionality
- **User Authentication**: Secure login/signup system
- **Address Management**: Multiple delivery address support
- **Order Tracking**: Real-time updates on order status
- **Payment Options**: Support for both COD and online payments via Stripe
- **Best Sellers Section**: Highlighting popular products
- **Newsletter Subscription**: Email updates on new products and offers

### Seller Dashboard
- **Product Management**: Add, edit, and remove products
- **Order Processing**: Manage and update order status
- **Sales Analytics**: Track performance metrics
- **Inventory Management**: Stock level monitoring

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe account (for payment processing)
- Cloudinary account (for image storage)

### Installation Instructions
1. Clone the repository
   ```
   git clone https://github.com/sewminiJayawardhana/BuyNow.git
   ```

2. Install dependencies for both client and server
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   Create `.env` files in both client and server directories with necessary configuration

4. Run the application
   ```
   # Start server
   cd server
   npm run server

   # Start client
   cd ../client
   npm run dev
   ```

5. Access the application
   Open your browser and navigate to `http://localhost:5173`



## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sewmini Jayawardhana - [GitHub](https://github.com/sewminiJayawardhana)

Project Link: [https://github.com/sewminiJayawardhana/BuyNow](https://github.com/sewminiJayawardhana/BuyNow)
