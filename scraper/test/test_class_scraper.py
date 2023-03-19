import sys
from bs4 import BeautifulSoup
import pytest
import requests
import tldextract
  
# adding Folder_2/subfolder to the system path
sys.path.insert(0, '/Users/lj2k/cw-code-t12/scraper')

import companyScraper

class TestGrp:
    urls = ['https://www.krispykreme.co.uk/responsible-sourcing',
        'https://www.nike.com/gb/sustainability/materials']
    company_classes = {
    "krispykreme": ('pagebuilder-column'),
    "nike": ('_3T7SP3hk')
    }
    
    def test_array_correlation_append_missing_values(self):
        assert companyScraper.compare_array_add_missing_values([1,2,3],[1,2,3,4,5]) == [1,2,3,4,5]
        assert companyScraper.compare_array_add_missing_values([0],[1,2,3,4,5]) == [1,2,3,4,5,0]
        assert companyScraper.compare_array_add_missing_values([],[1,2,3,4,5]) == [1,2,3,4,5]


    # Return a list of key sustainable categories that are determined by the quantity of applicable words mentionned
    # Example : Key = Poverty : Associated Words = ['Poverty', 'Fairtrade'] 
    # All words are made lower case so there isn't an issue with capitalisation
    def test_if_strings_correlate_to_object_values(self):
        string_1 = 'Fairtrade is an example of where the conglomerates attempt to gain sustainibility points and battle fairtrade. We battle hunger in third world countries by providing fair wages'
        string_2 = '1, 2, 3, 4, 5'
        sustainable_categories = {
        "No Poverty": ('Poverty', 'Fairtrade'),
        "Zero Hunger": 'Hunger',
        "Good Health": ('Health', 'carbon', 'emission', 'emissions')
        }
        assert companyScraper.category_identifier(string_1,sustainable_categories) == ['No Poverty','Zero Hunger']
        assert companyScraper.category_identifier(string_2,sustainable_categories) == []
        assert companyScraper.category_identifier("",sustainable_categories) == []
    
    
    def test_url_validity(self):
        for url in self.urls:
            res = requests.get(url)
            assert res.status_code == 200
    
    def url_class_validity(url_array,brand):
        result_set_list = []
        
        for url in url_array:
            company = tldextract.extract(url).domain
            req = requests.get(url)
            html_page = req.content
            soup = BeautifulSoup(html_page, 'html.parser')
            text = soup.find_all('div', {'class': brand[company]})
            if text != None:
                result_set_list.append(text)
        return result_set_list
    
    # Ensure bs4 result set quantity is equal to the urls as if the url scrape isn't valid then it would push a result set
    def test_bs4_result_set(self):
        assert len(TestGrp.url_class_validity(self.urls,self.company_classes)) == len(self.urls)
