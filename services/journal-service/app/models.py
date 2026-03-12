from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

Base = declarative_base()


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    mood_score = Column(Integer, nullable=False)
    mood_label = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)