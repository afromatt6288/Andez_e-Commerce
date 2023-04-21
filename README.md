# Andez_e-Commerce

## Overview
The Andez e-commerce site is a web application built with React,Python, Flask, and SQL. It provides a platform for buying and selling items online. The site includes features such as user registration, login and logout, shopping cart functionality, and transaction history. Users can add Site Coins to their account using a fake credit card and use them to purchase items listed on the site. Items for sale are listed with details such as name, price, description, and vendor. Transactions are recorded with the user, items purchased, total price, and transaction date. The application includes Vendors, who have their own page with their name, items for sale. 

As a stretch goal, we would like to implement item and vendor reviews. We'd also like to have Refunds that can be issued for specific items. This would add an extra layer of functionality to the site.

## Setup / Running the Project (on Windows)
Enter you terminal (however you have set up to do so.)
    Make sure you can run 2 terminals for this. 

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

Python/Flask:
Type: pipenv install
(it can take a little while, so please be patient)
Type: pipenvshell to enter the virtual environment
cd into server
Run the following commands:
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    flask db init
    flask db revision --autogenerate -m 'Create tables' 
    flask db upgrade 
    chmod +x seed.py (to unlock permisions)
    python seed.py (wait a moment)
        If any of these give a hiccup, you can delete the instance and migration folders and run these again.
    chmod +x app.py (to unlock permisions) 

React:
cd into client
Run the following Commands:
    npm install

Congrats, you are now configured and ready to run this program!

## Instructions:
### How to Start the program
Python/Flask:
from the server folder run:
    python app.py

React:
in a second terminal:
from the client folder run:
    npm run start
    you will be taken to http://localhost:4000
        if that doesn't load right away, your terminal will also show another option that works more consistantly. You can navigate to it manually. It will look something like this:
            http://172.17.32.198:4000 

And it begins!

### How to access the programs Functions:
Login button on the upper right. 
Create a Profile
Log in
Enjoy


## Assignment Goals
As per the Project Pitch Template:

Done! - Use a Flask API backend with a React frontend.
    Can be improved. But, there is a backend and a React frontend... though they can be fleshed out further.
    

Done! - Have at least three models on the backend, that include the following:
    At least two one-to-many relationships.
        User to Transaction. Item to Transaction. Vendor to VendorItem. Item to VendorItem.
    At least one reciprocal many-to-many relationship.
        Users to Items through Transactions. Vendors to Items through VendorItems

Done! - Full CRUD actions for at least one resource.
    Create:
        User created at signup
        Item created in Add Item Tab (admin only)
        Vendor created in Add Vendor Tab (admin only)
        VendorItem created from both Vendor and Item Tabs
        Transaction Created through Shopping Cart Tab

    Read:
        Users can be all seen in Users Tab (admin only)
        Users can view their specific profile
        Items can be viewed in Items Tab
        Vendors can be viewed in Vendors Tab
        Items can be viewed in the Vendor Details through VendorItems
        Vendors can be viewed in the Item Details through VendorItems
        Transactions can be viewed for logged in User

    Update:
        Users account balance, email, and address can all be changed in Users Tab (admin only)
        Users account balance, email, and address can all be changed in their Profile

    Delete:
        Users can be deleted through the Users Tab (admin only)
        Users can be deleted in their Profile
        User deletion will also delete Transactions they are in.
        Items can be deleted in their Detail (admin only)
        Item deletion will also delete Transactions, and VendorItems they are in. 
        Vendors can be deleted in their Detail (admin only)
        Vendor deletion will also delete VendorItems they are in. 

Done! - Minimum of create and read actions for EACH resource.
    Create and Read done for Users, Items, Vendors, VendorItems, and Transactions.

Done! - Use at least 1 validations on the Backend tables
    So many that I wont list them all here. 

Done! - Have at least three different client-side routes using React Router. 
    Be sure to include a nav bar or other UI element that allows users to navigate between routes.
        NavBar has 4 routes for Users, and an additional 3 for Admin
        
Done! - Connect the client and server using fetch().
    Many connections (for the CRUD above)

Done! - Implement Authorization
    - Password Hash is present. 
    - Invalid users are denied login, and receive a message saying they are not valid. 
    - Sections of the app are not accessible unless one is an authorized admin
    - to add funds a User must enter a fake CC, which is checked for "validity"
    - Users are denied accessing/increasing their funds without a valid cc
    - users cannot spend to below $1 Nut

Done! -  Have a clear readMe with:
    Done! - An Overview about what your project is about
    Done! - Instructions for running your project
    Done! - Instructions for using your project

Done! - Demonstrate good git practices with your partner
    We have all sorts of adds, commits, pushes, branches and merges. 
    We even have a revert from a merge. 


## Project Pitch/Ideas. 

The Andez e-commerce site is a web application built with React,Python, Flask, and SQL. It provides a platform for buying and selling items online. The site includes features such as user registration, login and logout, shopping cart functionality, and transaction history. Users can add Site Coins to their account using a fake credit card and use them to purchase items listed on the site. Items for sale are listed with details such as name, price, description, and vendor. Transactions are recorded with the user, items purchased, total price, and transaction date. Refunds can also be issued for specific items.

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