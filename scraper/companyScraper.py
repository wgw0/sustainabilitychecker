from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
from pprint import pprint
import urllib.parse
import datetime
import string
import tldextract

safe_string = urllib.parse.quote_plus("Lenja2001@")

mongo_uri = "mongodb+srv://stealthchopper:" + safe_string + \
    "@leozeo.skcjo.mongodb.net/cosustain?retryWrites=true&w=majority"


client = MongoClient(
    mongo_uri)

db = client.cosustain

serverStatusResult = db.command("serverStatus")
pprint(serverStatusResult)

# This could be a list of classes from the given urls

getdate = datetime.date.today()
stringdate = getdate.strftime('%d/%m/%Y')

sustainable_categories = {
    "No Poverty": ('Poverty', 'Fairtrade'),
    "Zero Hunger": 'Hunger',
    "Good Health": ('Health', 'carbon', 'emission', 'emissions'),
    "Quality Education": ('Education'),
    "Gender Equality": ('Gender'),
    "Clean water and sanitation": ('Clean Water'),
    "Affordable and clean energy": ('Affordable', 'Energy'),
    "Decent work and economic growth": ('Work', 'Economic', 'Growth', 'fairtrade'),
    "Industry, innovation and infrastructure": ('Industry', 'Innovation', 'Infrastructure'),
    "Reduced inequalities": ('Inequality', 'Equality'),
    "Sustainable cities and communities": ('Community', 'City', 'social'),
    "Responsible consumption and production": ('Production', 'Manufacturing', 'Consumption', 'source', 'sourcing', 'plastic', 'organic', 'material', 'materials'),
    "Climate action": ('Climate'),
    "Life below water": ('Life', 'Water', 'animal', 'recycled', 'plastic'),
    "Life on Land": ('Life', 'animal', 'carbon', 'emission', 'emissions'),
    "Peace justice and strong institutions": ('Peace', 'Justice', 'Institutions'),
    "Partnerships for the goals": ('Partenership', 'Goals', 'Goal', 'cooperatives', 'partners', 'partner'),
}

# class keys according to the url
companies = {
    "krispykreme": ('pagebuilder-column'),
    "nike": ('_3T7SP3hk')
}

urls = ['https://www.krispykreme.co.uk/responsible-sourcing',
        'https://www.nike.com/gb/sustainability/materials']

# counter help from https://realpython.com/python-counter
# Get the company name and extract its sustainable names that are keys we stored in our sustainable_category object
def category_identifier(string1, object):
    split_string = string1.translate(
        str.maketrans('', '', string.punctuation)).split()
    counter = {}
    for word in split_string:
        for key, value in object.items():
            if isinstance(value, str) and value.lower() == word.lower():
                counter[key] = counter.get(key, 0) + 1
            if isinstance(value, tuple):
                for v in value:
                    if v.lower() == word.lower():
                        counter[key] = counter.get(key, 0) + 1
    if len(counter.keys()) > 1:
        return list(counter.keys())
    else:
        return list()

# Extract business domain name from the url we are using

def urlExtract(array):
    for url in array:
        company = tldextract.extract(url).domain
        req = requests.get(url)
        html_page = req.content
        soup = BeautifulSoup(html_page, 'html.parser')
        text = soup.find_all('div', {'class': companies[company]})
        extract_and_show(text,company)

# check if sustainable goal is in the company_data array if not, add it;
def compare_array_add_missing_values(array,co_array):
    for y in array:
        if y not in co_array:
            co_array.append(y)
    return co_array

# Retrieve the filter each div we retrieve from a specific class and filter it depending if it has both header and paragraph and is above 6 characters
def extract_and_show(string_div_array, companyName):
    div_array = []
    for div in string_div_array:
        if div.h3 and div.p != None and len(div.p.get_text().split()) > 6:

            sustainable_presence = category_identifier(div.p.get_text().strip(), sustainable_categories)

            company_query = { "urlname": companyName }
            # Get header and pararaph and push them into our data object
            data = {
                'company': companyName,
                'header': div.h3.get_text().strip(),
                'paragraph': div.p.get_text().strip(),
                'date': stringdate,
                'category': sustainable_presence
            }

            div_array.extend(div.h3.get_text().strip(),div.h3.get_text().strip())
            add_data_to_database(data,company_query)
        elif div.h4 and div.p != None and len(div.p.get_text().split()) > 6:
            # Get header and pararaph and push them into our data object
            sustainable_presence = category_identifier(div.p.get_text().strip(), sustainable_categories)

            company_query = { "urlname": companyName }
            
            data = {
                'company': companyName,
                'header': div.h4.get_text().strip(),
                'paragraph': div.p.get_text().strip(),
                'date': stringdate,
                'category': sustainable_presence
            }

            div_array.extend(div.h3.get_text().strip(),div.h3.get_text().strip())
            add_data_to_database(data,company_query)
        else:
            print("Worthless Content ignored")
    return div_array

def add_data_to_database(obj,query):
    company_entry = db.coBox.find_one(query)
    current_presence = company_entry['sustainibilities']
    db.coBox.update_one(query, {"$set": {"sustainibilities": compare_array_add_missing_values(obj['category'],current_presence)}})
    db.codata.insert_one(obj)

def main():
    urlExtract(urls)


if __name__ == "__main__":
    main()

# We may need to put documents more tightly
