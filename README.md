# stethoscope
Low cost electronic stethoscope for remote auscultations in times of social distancing.  The physical hardware, is a simple microphone circuit with a 3D printable or cheaply bought stethoscope bell. The device is plugged into the headset jack of a computer and recognized by the software, which is an easily accessible website that guides a user through the process. The webapp is hosted [here](https://stethoscope-api-heroku.herokuapp.com/).

### To install:
Clone the repository by downloading or running 
`git clone https://github.com/sap5699/stethoscope`
Make sure you have python and flask installed. Download python
[here](https://www.python.org/downloads/).
Then install flask with 
`pip install flask`
You may have to use sudo.

### To run
Set the environment variable for flask to know where the python script is. On windows this is
`set FLASK_APP=\path\to\webapp.py`
On linux you can use
`export FLASK_APP=/path/to/webapp.py`

If you want to set debug mode on, use
`set FLASK_DEBUG=1`

Finally, run with
`flask run`
on windows or
`python /path/to/webapp.py`
for linux
