import json

# Open the JSON file for reading
with open('./data.json', 'r') as json_file:
    # Load the JSON data into a Python dictionary
    json_data = json.load(json_file)

    # Print the JSON data
    print(json_data)

