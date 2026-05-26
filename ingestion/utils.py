ALLOWED_UNITS = [
    'L',
    'kWh',
    'MWh',
    'km'
]


def normalize_unit(value, unit):

    if unit == 'MWh':
        return value * 1000, 'kWh'

    return value, unit


def validate_record(value, unit):

    flags = []

    if value < 0:
        flags.append('NEGATIVE_VALUE')

    if value > 100000:
        flags.append('SUSPICIOUS_SPIKE')

    if unit not in ALLOWED_UNITS:
        flags.append('UNKNOWN_UNIT')

    return flags