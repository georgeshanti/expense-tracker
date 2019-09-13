from wtforms.validators import InputRequired
from app import db

class Transaction(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	date = db.Column(db.Date)
	cycle_id = db.Column(db.Integer, db.ForeignKey('cycle.id'), nullable=False, info={'validators': InputRequired()})
	cycle = db.relationship("Cycle")
	txn_type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False)
	txn_type = db.relationship("Type")
	description = db.Column(db.String(length=256))
	mode_id = db.Column(db.Integer, db.ForeignKey('mode.id'), nullable=False)
	mode = db.relationship("Mode")
	transfer = db.Column(db.Float, default=0)
	debit = db.Column(db.Float, default=0)
	credit = db.Column(db.Float, default=0)

	def get_subtotal(self):
		return self.credit - self.debit

	def to_json(self, show=None, _hide=[], _path=None):
		json = {}
		json['id'] = self.id
		json['date'] = self.date
		json['cycle_id'] = self.cycle_id
		json['cycle'] = self.cycle.name
		json['txn_type_id'] = self.txn_type_id
		json['txn_type'] = self.txn_type.name
		json['description'] = self.description
		json['mode_id'] = self.mode_id
		json['mode'] = self.mode.name
		json['transfer'] = self.transfer
		json['debit'] = self.debit
		json['credit'] = self.credit
		return json