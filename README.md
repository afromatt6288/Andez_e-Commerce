# Andez_e-Commerce


## Overview
The Andez e-commerce site is a web application built with React, Next.js, Python, and SQL. It provides a platform for buying and selling items online. The site includes features such as user registration, login and logout, shopping cart functionality, and transaction history. Users can add Site Coins to their account using a fake credit card and use them to purchase items listed on the site. Items for sale are listed with details such as name, price, description, and vendor. Transactions are recorded with the user, items purchased, total price, and transaction date. Refunds can also be issued for specific items.

As a stretch goal, the application includes Vendors, who have their own page with their name, items for sale, and reviews. This adds an extra layer of functionality to the site and allows users to view and purchase items from specific vendors.

## Setup / Running the Project (on Windows)
Enter you terminal (however you have set up to do so.)

### Check Python version
Type: python --version
If you are running Python 3.9.2 or higher you can skip the next section

### Install the correct python. 
Navigate to the following website and follow the instructions to install Python 3 on your system
For Windows:
https://docs.python.org/3/using/windows.html
For Mac:
https://docs.python.org/3/using/mac.html
For Unix (ie: Linux):
https://docs.python.org/3/using/unix.html

### Install the Virtual Environment
In your terminal, navigate to the root directory of this project:

Python:
Type: pipenv install
(it can take a little while, so please be patient)
Type: pipenvshell to enter the virtual environment
More to come

React:
TBD

Congrats, you are now configured and ready to run this program!

## Instructions:
### How to Start the program
React:
TBD

Python/Flask:
From the root folder of this project, in the command line of your terminal...
Type: chmod +x lib/seed.py (to unlock permisions)
Type: lib/seed.py (to populate the database. Otherwise the game will be empty.)
Type: chmod +x lib/main.py (to unlock permisions)
Type: lib/main.py

And it begins!

### How to access the programs Functions:
TBD


## Assignment Goals
As per the Project Pitch Template:

In Progress... Use a Flask API backend with a React frontend.
    

In Progress... Have at least three models on the backend, that include the following:
    At least two one-to-many relationships.
    At least one reciprocal many-to-many relationship.

In Progress... Full CRUD actions for at least one resource.
    Create:

    Read:

    Update:

    Delete:

In Progress... Minimum of create and read actions for EACH resource.

In Progress... Use at least 1 validations on the Backend tables

In Progress... Have at least three different client-side routes using React Router. 
    Be sure to include a nav bar or other UI element that allows users to navigate between routes.

In Progress... Connect the client and server using fetch().

In Progress... Implement Authorization

In Progress... Have a clear readMe with:
    An Overview about what your project is about
    Instructions for running your project
    Instructions for using your project

In Progress... Demonstrate good git practices with your partner


## Project Pitch/Ideas. 

The Andez e-commerce site is a web application built with React, Next.js, Python, and SQL. It provides a platform for buying and selling items online. The site includes features such as user registration, login and logout, shopping cart functionality, and transaction history. Users can add Site Coins to their account using a fake credit card and use them to purchase items listed on the site. Items for sale are listed with details such as name, price, description, and vendor. Transactions are recorded with the user, items purchased, total price, and transaction date. Refunds can also be issued for specific items.

As a stretch goal, the application includes Vendors, who have their own page with their name, items for sale, and reviews. This adds an extra layer of functionality to the site and allows users to view and purchase items from specific vendors.

To set up the database schema, we need to identify the entities and their relationships. Based on the requirements provided, we can identify the following entities: Users, Items, Transactions, and Vendors. We can represent these entities using three tables: Users, Items, and Transactions. We can then create an additional table for Vendors to establish a many-to-many relationship.

Here's how we can set up the tables:
Users table: user_id (primary key), username, password, email, shipping_address, account_balance
Items table: item_id (primary key), name, price, description, vendor_id (foreign key referencing the Vendors table… maybe)
Transactions table: transaction_id (primary key), user_id (foreign key referencing the Users table) ,item_id (foreign key referencing the Items table), item_price, transaction_date, total_price, refund boolean, update_date for refund.

Stretch Goal: 
Vendors table: vendor_id (primary key), Vendor_name
VendorItems table: vendor_id (foreign key referencing the Vendors table), item_id (foreign key referencing the Items table)

In this schema, the Users table has a one-to-many relationship with the Transactions table since a user can have many transactions. The Items table also has a one-to-many relationship with the Transactions table since an item can be sold in multiple transactions. The Transactions table also establishes a many-to-many relationship between users and items since a user can purchase multiple items, and an item can be purchased by multiple users.

The Vendors table establishes a many-to-many relationship with the Items table since a vendor can sell multiple items, and an item can be sold by multiple vendors. We can represent this relationship using a junction table:

This schema allows us to efficiently store and retrieve information for the Andez e-commerce site while maintaining data integrity and minimizing redundancy.