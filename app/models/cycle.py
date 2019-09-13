from app import db

class Cycle(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(length=128))

	def to_json(self, show=None, _hide=[], _path=None):
		json = {}
		json['id'] = self.id
		json['name'] = self.name
		return json

	def __repr__(self):
		return self.name