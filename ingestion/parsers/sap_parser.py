import pandas as pd

def parse_sap(file_path):

    df = pd.read_csv(file_path)
    records = []
    for _, row in df.iterrows():
        record = {
            'category': 'Fuel',
            'value': float(row['Menge']) if row['Menge'] else 0,
            'unit': row['Einheit'],
            'date': row['Buchungsdatum'],
            'scope': 'Scope 1'
        }
        records.append(record)

    return records