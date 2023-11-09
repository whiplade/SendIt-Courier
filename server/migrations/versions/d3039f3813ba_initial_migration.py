"""initial migration

Revision ID: d3039f3813ba
Revises: c8a03969b595
Create Date: 2023-11-07 07:58:19.215472

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3039f3813ba'
down_revision = 'c8a03969b595'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('parcels')
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(length=255), nullable=False),
    sa.Column('email', sa.VARCHAR(length=255), nullable=False),
    sa.Column('password', sa.VARCHAR(length=255), nullable=False),
    sa.Column('role', sa.VARCHAR(length=255), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('parcels',
    sa.Column('parcel_id', sa.INTEGER(), nullable=False),
    sa.Column('weight', sa.FLOAT(), nullable=False),
    sa.Column('description', sa.VARCHAR(length=255), nullable=False),
    sa.Column('recipient_name', sa.VARCHAR(length=50), nullable=False),
    sa.Column('recipient_phone_number', sa.VARCHAR(length=50), nullable=False),
    sa.Column('pickup_location', sa.VARCHAR(length=255), nullable=False),
    sa.Column('destination', sa.VARCHAR(length=255), nullable=False),
    sa.Column('status', sa.VARCHAR(length=50), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('present_location', sa.VARCHAR(length=255), nullable=False),
    sa.Column('created_at', sa.DATETIME(), nullable=False),
    sa.Column('updated_at', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('parcel_id')
    )
    # ### end Alembic commands ###
