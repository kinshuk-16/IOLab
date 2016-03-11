from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, SelectMultipleField
from flask_wtf.html5 import EmailField
from wtforms.validators import DataRequired
from app import models

class CustomerForm(Form):
    fname = StringField('fname', validators=[DataRequired()])
    lname = StringField('lname', validators=[DataRequired()])
    company = StringField('company', validators=[DataRequired()])
    email = EmailField('email', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    # Add additional Address fields here
    street = StringField('street', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zipc = StringField('zip', validators=[DataRequired()])


class OrderForm(Form):
    n_parts = StringField('n_parts', validators=[DataRequired()])
    myChoices = [(g.email,g.email) for g in models.Customer.query.all()]
    cust = SelectMultipleField('customer',choices = myChoices,validators=[DataRequired()])
    

