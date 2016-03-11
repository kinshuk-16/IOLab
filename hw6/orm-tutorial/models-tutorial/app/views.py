from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm
from .forms import OrderForm

@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    if form.validate_on_submit():
        customer = models.Customer(
                            f_name = form.fname.data,
                            l_name = form.lname.data,
                            company = form.company.data,
                            email = form.email.data,
                            phone = form.phone.data)
        # you will need to add Address here
        address = models.Address(
                            street = form.street.data,
                            city = form.city.data,
                            state = form.state.data,
                            country = form.country.data,
                            zipcode = form.zipc.data,
                            customer = customer)
        db.session.add(customer)
        db.session.add(address)
        db.session.commit()
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    customers = models.Customer.query.all()
    addresses = models.Address.query.all()
    orders = models.Order.query.all()
    return render_template('home.html',
                            customers=customers,addresses=addresses,orders=orders)

@app.route('/get_orders', methods=['GET', 'POST'])
def get_orders():
    form = OrderForm()
    if form.validate_on_submit():
        cust_obj =[]
        for e_mail in form.cust.data:
            cust_obj.append(models.Customer.query.filter_by(email=e_mail).first())
            #print "HERE",e_mail
        order = models.Order(
                            num_parts_ordered  = int(form.n_parts.data),
                            total_spent = int(form.n_parts.data) *100,
                            customer = cust_obj)
        db.session.add(order)
        db.session.commit()
        return redirect('/customers')
    return render_template('order.html', form=form)

