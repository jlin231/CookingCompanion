from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, SubmitField, IntegerField,
)
from wtforms.validators import DataRequired, ValidationError, NumberRange

def comment_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 50 :
        raise ValidationError('Comment must be between 3 and 100 characters long')


class CommentForm(FlaskForm):
  comment = StringField('comment', validators=[DataRequired(), comment_validator])
