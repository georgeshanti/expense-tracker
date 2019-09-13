from app import app, db
from app.models import Transaction, Mode, Type, Cycle
import csv
from datetime import date, datetime

_modes = Mode.query.all()
_types = Type.query.all()
cycle = Cycle.query.one()

modes = {}
for _mode in _modes:
	modes[_mode.name]=_mode.id

types = {}
for _type in _types:
	types[_type.name]=_type.id

with open('file.csv', newline='') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	for row in spamreader:
		date_time_obj = datetime.strptime(row[0], '%m/%d/%Y')
		tran_type = types[row[1]]
		description = row[2]
		mode_type = modes[row[3]]
		transfer = '0' if row[4]=='' else row[4]
		debit = '0' if row[5]=='' else row[5]
		credit = '0' if row[6]=='' else row[6]
		# print(debit)
		# print(date_time_obj, tran_type, row[1], description, mode_type, row[3], transfer, debit, credit)
		trans = Transaction(
			date=date_time_obj,
			cycle_id=cycle.id,
			txn_type_id=tran_type,
			description=description,
			mode_id=mode_type,
			transfer=float(transfer),
			debit=float(debit),
			credit=float(credit))
		db.session.add(trans)
		# print(trans)

db.session.commit()