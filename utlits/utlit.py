import typing as t
import uuid
import re
import random

def required_fields(data: dict, **kwargs: t.Dict[str, t.Any]) -> list:
    missing = []
    for k, v in kwargs.items():
        if not (data.get(k) and isinstance(data.get(k), v)):
            missing.append(k)
    return missing

def gen_token() -> str:
    return uuid.uuid4().hex

regex_em = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
def check_email(email: str):  
    if(re.search(regex_em, email)):  
        return True 
    else:  
        return False

def gen_id(length: int = 20) -> int:
    return int("".join([str(random.randint(0, 9)) for _ in range(length-1)]))
