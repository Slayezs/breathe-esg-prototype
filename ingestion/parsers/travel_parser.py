import pandas as pd

def parse_travel(file_path):

    df = pd.read_csv(file_path)
    records = []
    for _, row in df.iterrows():
        record = {
            'category': row['Travel Type'],
            'value': float(row['Distance']) if row['Distance'] else 0,
            'unit': 'km',
            'date': row['Travel Date'],
            'scope': 'Scope 3'
        }
        records.append(record)

    return records