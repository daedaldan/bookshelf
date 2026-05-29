# Bookshelf
Bookshelf is an app that lets your share your favorite books with others.

To install the app on your local machine, run the following lines on the command line:
```
git clone https://github.com/daedaldan/bookshelf.git
cd bookshelf
python -m venv venv
source venv/bin/activate
npm install
npm run build
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
