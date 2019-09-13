from app import db

class Mode(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(length=64))

	def __repr__(self):
		return self.name