import pandas as pd

def parse_utility(file_path):

    df = pd.read_csv(file_path)
    records = []
    for _, row in df.iterrows():
        record = {
            'category': 'Electricity',
            'value': float(row['Usage']) if row['Usage'] else 0,
            'unit': row['Unit'],
            'date': row['Billing End'],
            'scope': 'Scope 2'
        }
        records.append(record)

    return records