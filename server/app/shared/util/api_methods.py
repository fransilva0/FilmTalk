from app.service.UserService import UserService
userService = UserService()
import math


def convert_rows_object_to_dict(rows):
    data = []
    for row in rows:
        data.append(row._asdict())
    return data

def convert_row_to_dict(row):
    dict = row._asdict()
    return dict

def paginate(offset,limit,list):
    page = []
    pagination = {
        "total_records": None,
        "current_page": None,
        "total_pages": None,
        "next_page": None,
        "prev_page": None
    }
    if len(list) == 0:
        return page,pagination
    else:
        pagination["total_records"] = len(list)
        pagination["total_pages"] = int(math.ceil(pagination["total_records"]/limit))
        if offset > pagination["total_pages"]:
            raise Exception("offset out of range",400)
        pagination["current_page"] = offset
        pagination["next_page"] = pagination["current_page"] + 1 if pagination["current_page"] < pagination["total_pages"] else None
        pagination["prev_page"] = pagination["current_page"] - 1 if pagination["current_page"] > 1 else None
        current_item = ((pagination["current_page"]-1)*limit)
        last_item = pagination["total_records"] if limit*offset > pagination["total_records"] else (limit*offset)

        page = create_page(current_item=current_item,range=last_item,list=list)

        return page,pagination

def create_page(current_item,range,list):
    page = []
    while current_item < range:
        page.append(list[current_item])
        current_item+=1
    return page

