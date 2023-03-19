# Documentation


## Usage

The software provides a list of companies. For each company, the user can find out how many of the global sustainable goals the company meets. By clicking on one of the brands, the user can find out more about the brand and these goals.

## Scraper Break-Down

1. Visits list of company /sustainable urls.
2. Extracts all the texts
3. Checks if texts abide by any sustainable words **values** we have that match a **sustainable goal key**
4. Processes texts into our database if theyre a certain length and **updates** company list of sustainabilities they follow .

## To get started (Mac)

### Commands

1. To install all npm modules
- npm i

2. To connect client to back-end to be able to fetch content
- Create a .env.local in root of file

3. Install Python dependencies

**Before anything ensure you install python 3.8.9 64-bit**

(https://www.python.org/downloads/)

- cd scraper
- pip3 install -r requirements.txt

**ISSUES TO LOOK OUT FOR**

-Mac OPENSSL mongodb connection issues.

1. touch ~/.bash_profile; open ~/.bash_profile

2. Insert [fix](./MDIMAGES/fix.png)

## Development Process

1. Make a new branch.
2. The new branch should be named either `fix/thing-you-are-fixing` or `feat/feature-you-are-building`
3. Work on this branch
4. When you have reached suitable stage, create a pull request to merge your new branch into the main branch. Add other teammates as reviewers and put the link in discord.
5. Another team member reviews these changes, and either approves them or suggests something that needs to be changed.
6. Once anything that needs to be is corrected, merge your branch into the main branch.
7. Navigate back to main branch on your pc and git pull.