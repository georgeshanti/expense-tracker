from app import db

class Type(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(length=64))

	def __repr__(self):
		return self.name