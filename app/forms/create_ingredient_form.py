from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, SubmitField, IntegerField,
)
from wtforms.validators import DataRequired, ValidationError, NumberRange

def name_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 50 :
        raise ValidationError('Name must be between 3 and 100 characters long')

def quantity_validator(form, field):
    if field.data < 0:
        raise ValidationError('Quantity must be greater than 0')

def instruction_validator(form, field):
    if len(field.data) < 1 or len(field.data) > 2000 :
        raise ValidationError('State must be between 3 and 2000 characters long')

class EditIngredientForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), name_validator])
  quantity = StringField('quantity', validators=[DataRequired(), quantity_validator])
  unit = StringField('unit', validators=[DataRequired()])
