from sqlalchemy.orm import Session

from . import keygen, models, schemas

def get_db_url_by_key(db:Session, url_key:str) -> models.URL:
    return db.query(models.URL).filter(models.URL.key == url_key,models.URL.is_active).first()

def create_db_url(db: Session, url: schemas.URLBase) -> models.URL:
    key = keygen.create_random_keys()
    secret_key = keygen.create_random_keys(length=8)
    db_url = models.URL(target_url = url.target_url, key = key, secret_key=secret_key)

    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url