from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, SubmitField, IntegerField,
)
from wtforms.validators import DataRequired, ValidationError, NumberRange

def title_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 50 :
        raise ValidationError('Title must be between 3 and 100 characters long')

def description_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 1000 :
        raise ValidationError('Description must be between 3 and 1000 characters long')

def time_validator(form, field):
    if field.data < 1 or field.data >= 300 :
        raise ValidationError('Completion time must be between 1 and 300 minutes')

def instruction_validator(form, field):
    if len(field.data) < 1 or len(field.data) > 2000 :
        raise ValidationError('State must be between 3 and 2000 characters long')

class CreateRecipeForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), title_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  timeToComplete = IntegerField('timeToComplete', validators=[DataRequired(), time_validator])
  previewImage = StringField('previewImage', validators=[DataRequired()])
  instructions = StringField('instructions', validators=[DataRequired(), instruction_validator])

class EditRecipeForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), title_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  timeToComplete = IntegerField('timeToComplete', validators=[DataRequired(), time_validator])
  previewImage = StringField('previewImage', validators=[DataRequired()])
  instructions = StringField('instructions', validators=[DataRequired(), instruction_validator])
