from app import db

orders = db.Table('orders',
    db.Column('order_id', db.Integer, db.ForeignKey('order.id')),
    db.Column('cust_id', db.Integer, db.ForeignKey('customer.id'))
)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(120))
    l_name =db.Column(db.String(120))
    company = db.Column(db.String(120))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(12))
    addresses = db.relationship('Address', backref='customer',lazy='dynamic')
    orders = db.relationship('Order', secondary=orders, backref=db.backref('customer', lazy='dynamic'))
    # You need to a relationship to Address table here
    # see http://flask-sqlalchemy.pocoo.org/2.1/models/#one-to-many-relationships

    def __repr__(self):
        return '<Customer %r>' % self.email

# Your Address code should go here
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(120))
    city = db.Column(db.String(120))
    state = db.Column(db.String(120))
    country = db.Column(db.String(120))
    zipcode = db.Column(db.String(9))
    cust_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    def __repr__(self):
        return '<Address %r>' % self.street


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_spent = db.Column(db.Integer)
    num_parts_ordered = db.Column(db.Integer)


    





