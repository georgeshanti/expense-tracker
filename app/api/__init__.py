from flask import jsonify

from app import app, db
from app.models import Cycle, Mode, Type, Transaction

@app.route('/api/cycle', methods=['GET'])
def get_cycles():
	cycles = Cycle.query.all()
	result = []
	for cycle in cycles:
		cy = {}
		cy['id'] = cycle.id
		cy['name'] = cycle.name
		result.append(cy)
	return jsonify(result)

@app.route('/api/cycle/<int:id>/type-split', methods=['GET'])
def get_cycle_type_split(id):
	result = db.session.query(
		Type.name,
		db.func.sum(Transaction.debit).label('debit')
	).join(Type).filter(Transaction.cycle_id==id).group_by(Transaction.txn_type_id).all()
	types = []
	for type in result:
		types.append([type[0], type[1]])
	# print(types)
	return jsonify(types)

@app.route('/api/cycle/<int:id>/summary', methods=['GET'])
def get_cycle_summary(id):
	result = db.session.query(
		db.func.sum(Transaction.credit), db.func.sum(Transaction.debit)
	).filter(Transaction.cycle_id==id).one()
	credit = float(format(result[0], '.2f'))
	debit = float(format(result[1], '.2f'))
	balance = credit - debit
	sal = db.session.query(
		db.func.sum(Transaction.credit)
	).filter(Transaction.cycle_id==id).filter(Transaction.txn_type_id==10).one()[0]
	salary = float(format(sal, '.2f'))
	expense = salary - balance
	return jsonify({'credit': credit, 'debit': debit, 'balance': balance, 'salary': salary, 'expense': expense})

@app.route('/api/cycle/<int:id>/transaction', methods=['GET'])
def get_cycle_transactions(id):
	transactions = Transaction.query.filter(Transaction.cycle_id==id).all()
	result = []
	print(transactions)
	for transaction in transactions:
		json = {}
		json['id'] = transaction.id
		json['date'] = transaction.date.strftime("%Y-%m-%d")
		json['cycle_id'] = transaction.cycle_id
		json['cycle'] = transaction.cycle.name
		json['txn_type_id'] = transaction.txn_type_id
		json['txn_type'] = transaction.txn_type.name
		json['description'] = transaction.description
		json['mode_id'] = transaction.mode_id
		json['mode'] = transaction.mode.name
		json['transfer'] = transaction.transfer
		json['debit'] = transaction.debit
		json['credit'] = transaction.credit
		result.append(json)
	return jsonify(result)