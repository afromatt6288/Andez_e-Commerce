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
            password.encode('utf-8'))               # utf-8 encoding and decoding is required in python 3
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

    @validates('account_balance')
    def validate_account_balance(self, key, account_balance):
        if not account_balance:
            raise ValueError("User must have an account_balance.")
        elif int(account_balance) >= 0:
            raise ValueError("User account_balance cannot be negative.")
        return account_balance
    
    def __repr__(self):
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}, Address: {self.shipping_address}, Account Balance: {self.account_balance}'

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    serialize_rules = ('-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    ## still need name, price, description, stretch-(vendor_id)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    pass

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    serialize_rules = ('-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    ## still need user_id, item_id, item_price, transaction_date, refund, update_date, (total price will be a front end function)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    pass

## Stretch
class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'

    serialize_rules = ('-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    ## still need vendor_name

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    pass

class Vendor_Item(db.Model, SerializerMixin):
    __tablename__ = 'vendor_items'

    serialize_rules = ('-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    ## still need vendor_id, item_id

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    pass
