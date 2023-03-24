from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, SubmitField, IntegerField,
)
from wtforms.validators import DataRequired, ValidationError

def name_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 100 :
        raise ValidationError('Comment must be between 3 and 100 characters long')
def description_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 1000 :
        raise ValidationError('Comment must be between 3 and 1000 characters long')


class CollectionForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), name_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
