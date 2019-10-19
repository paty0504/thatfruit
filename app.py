from flask import *
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')
@app.route('/home')
def index():
    return render_template('index.html')
@app.route('/news')
def news():
    return render_template('news.html')    
@app.route('/aboutme')
def aboutme():
    return render_template('aboutme.html')  
@app.route('/login')
def login():
    return render_template('login.html')  
@app.route('/signIn')
def signIn():
    return render_template('signIn.html')  
@app.route('/listProduct')
def listProduct():
    return render_template('listProduct.html')  
@app.route('/contact')
def contact():
    return render_template('contact.html')  
if __name__ == '__main__':
  app.run(debug=True)    