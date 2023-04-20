from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-transactions.user', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    shipping_address = db.Column(db.String, nullable=False)
    account_balance = db.Column(db.Integer, nullable=False)
    admin = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    transactions = db.relationship('Transaction', backref='user', cascade="all, delete, delete-orphan")
    items = association_proxy('transactions', 'item')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) 
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        users = User.query.all()
        usernames = [user.username for user in users]
        if not username:
            raise ValueError("User must have a username")
        elif username in usernames:
            raise ValueError("User Username must be unique")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("User must have a email")
        if '@' not in email:
            raise ValueError("User failed simple email validation")
        return email

    @validates('shipping_address')
    def validate_shipping_address(self, key, shipping_address):
        if not shipping_address:
            raise ValueError("User must have a shipping_address")
        return shipping_address
    
    @validates('account_balance')
    def validate_account_balance(self, key, account_balance):
        if not account_balance:
            raise ValueError("User must have an account_balance.")
        elif int(account_balance) <= 0:
            raise ValueError("User account_balance cannot be negative.")
        return account_balance
    
    def __repr__(self):
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}, Address: {self.shipping_address}, Account Balance: {self.account_balance}'


class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    serialize_rules = ('-transactions.item', '-vendoritems.item', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, db.CheckConstraint('price > 0', name='positive_price'), nullable=False)
    category = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.String, db.CheckConstraint('len(description) <= 250', name='max_description_length'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    transactions = db.relationship('Transaction', backref='item', cascade="all, delete, delete-orphan")
    users = association_proxy('transactions', 'user')
    vendoritems = db.relationship('VendorItem', backref='item', cascade="all, delete, delete-orphan")
    vendors = association_proxy('vendoritems', 'vendor')

    @validates('name')
    def validate_itemname(self, key, name):
        if not name:
            raise ValueError("Item must have a name")
        return name

    @validates('price')
    def validate_itemprice(self, key, price):
        if not price:
            raise ValueError("Item must have an price.")
        elif int(price) < 1:
            raise ValueError("Item must cost more than 0 Andez Coins.")
        return price

    @validates('category')
    def validate_category(self, key, category):
        # categories = ["Home & Kitchen", "Clothing, Shoes & Jewelry", 
        #     "Electronics", "Cell Phones & Accessories", "Tools & Home Improvement", 
        #     "Toys & Games", "Automotive", "Office Products", "Sports & Outdoors", 
        #     "Patio, Lawn & Garden", "Pet Supplies", "Health & Household", 
        #     "Industrial & Scientific", "Beauty & Personal Care", "Baby Products", 
        #     "Arts, Crafts & Sewing", "Appliances", "Video Games", "Handmade Products", 
        #     "Musical Instruments", "Grocery & Gourmet Food"]
        categories = [
        "Tree nuts", "Peanuts", "Seeds", "Coconut", "Nut Butters", 
        "Nut Oils", "Nut Milk", "Nut Flours", "Featured Items", "Other"
        ]
        if not category:
            raise ValueError("Item must have a Category")
        if category not in categories:
            raise ValueError("Item Category not found")
        return category

    @validates('image')
    def validate_image(self, key, image):
        if not image:
            raise ValueError("Item must have an image")
        return image

    @validates('description')
    def validate_description_length(self, key, description):
        if len(description) >= 250:
            raise ValueError("Item Description must be less than or equal to 250 characters long.")
        return description
    
    def __repr__(self):
        return f'<Item: {self.name}, Price: {self.price}, Description: {self.description}>'


class Transaction(db.Model, SerializerMixin): 
    __tablename__ = 'transactions'

    serialize_rules = ('-user.transactions', '-item.transactions', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    refund = db.Column(db.Boolean)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())   ## transaction_date for the front end
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())         ## refund_date for the front end

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not user_id:
            raise ValueError("Transaction must have a user_id")
        elif int(user_id) not in ids:
            raise ValueError('Transaction User must exist.')
        return user_id
    
    @validates('item_id')
    def validate_item_id(self, key, item_id):
        items = Item.query.all()
        ids = [item.id for item in items]
        if not item_id:
            raise ValueError("Transaction must have a item_id")
        elif int(item_id) not in ids:
            raise ValueError('Transaction Item must exist.')
        return item_id

    def __repr__(self):
        return f'<Transaction #{self.id}, User: {self.user.username}, Item: {self.item.name}, Price: {self.item.price}, Transaction Date: {self.created_at}>'


## Stretch
class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'

    serialize_rules = ('-vendoritems.vendor', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    vendor_name = db.Column(db.String, nullable=False)    
    vendor_email = db.Column(db.String, nullable=False)
    vendor_address = db.Column(db.String, nullable=False)
    vendor_account_balance = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    vendoritems = db.relationship('VendorItem', backref='vendor', cascade="all, delete, delete-orphan")
    items = association_proxy('vendoritems', 'item')
 
    @validates('vendor_name')
    def validate_name(self, key, vendor_name):
        vendors = Vendor.query.all()
        names = [vendor.vendor_name for vendor in vendors]
        if not vendor_name:
            raise ValueError("Vendor must have a Name")
        elif vendor_name in names:
            raise ValueError("Vendor Name must be unique")
        return vendor_name

    @validates('vendor_email')
    def validate_vendor_email(self, key, vendor_email):
        if not vendor_email:
            raise ValueError("Vendor must have a Vendor Email")
        if '@' not in vendor_email:
            raise ValueError("Vendor failed simple Vendor Email validation")
        return vendor_email

    @validates('vendor_address')
    def validate_vendor_address(self, key, vendor_address):
        if not vendor_address:
            raise ValueError("Vendor must have a vendor Address")
        return vendor_address
    
    @validates('vendor_account_balance')
    def validate_vendor_account_balance(self, key, vendor_account_balance):
        if not vendor_account_balance:
            raise ValueError("Vendor must have an vendor_account_balance.")
        elif int(vendor_account_balance) <= 0:
            raise ValueError("Vendor vendor_account_balance cannot be negative.")
        return vendor_account_balance

    def __repr__(self):
        return f'Vendor ID: {self.id}, Name: {self.name}, Email: {self.email}, Store Address: {self.shipping_address}, Account Balance: {self.account_balance}'


class VendorItem(db.Model, SerializerMixin):
    __tablename__ = 'vendoritems'

    serialize_rules = ('-vendor.vendoritems', '-item.vendoritems', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    vendor_id = db.Column(db.Integer, db.ForeignKey('vendors.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    @validates('vendor_id')
    def validate_vendor_id(self, key, vendor_id):
        vendors = Vendor.query.all()
        ids = [vendor.id for vendor in vendors]
        if not vendor_id:
            raise ValueError("VendorItem must have a vendor_id")
        elif int(vendor_id) not in ids:
            raise ValueError('VendorItem Vendor must exist.')
        return vendor_id
    
    @validates('item_id')
    def validate_item_id(self, key, item_id):
        items = Item.query.all()
        ids = [item.id for item in items]
        if not item_id:
            raise ValueError("VendorItem must have a item_id")
        elif int(item_id) not in ids:
            raise ValueError('VendorItem Item must exist.')
        return item_id

    def __repr__(self):
        return f'VendorItem ID: {self.id}, Vendor Name: {self.vendor.vendor_name}, Item: {self.item.name}'