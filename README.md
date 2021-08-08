# GitHub Repo Search #

An example react app using the github api that lets you search github repos.

## Instructions ##

You must have npm and node installed to use this project.

### Setup ###

```
git clone https://github.com/FelixMo42/motili-homework.git`
cd motili-homework
npm install
```

### Run with local dev server ###

```
npm start
```

### Test ###

```
npm test
```

## Requirements ##

### 1. Search Input ###

Search page has a text box to enter the search term.
After trying both ways, I desided to make it reload the search results on every key stroke.

### 2. Search results ###

List of repos are generated and listed under the search fields.
Each repo shows the name of the owner and the repo, but nothing else.
When you click on the name, it brings you to an info page.

### 3. Sort results ###

You can select the sort method using a drop down.
The available choices are best match, stars, forks and recently updated.
The search results are reload every time you switch.

### 4. Filter results ###

Filter languages can be added useing the text field labeled 'language'.
The languages can be removed by clicking on them.
The reducer stops you from adding redundant languages.
Currently you can add languages that arent recognized by github.
The search results are reload every time you add or remove a language.

### 5. Detailed Result Page ###

The detailed page has all the request info: owner name, repo name, description, stars & languages.
It just displays this as some text, nothing fancy.
I figured this was more about if I could use a router.

### 6. Responsive Design ###

Its not very responsive, but the Search page does scale and looks pretty good on mobile.
The about page is literaly just the divs tags with some text.
I have some actually good responsive design for php templates I've made, so I can show you that if you want.

### Bonus ###

I have some testing for the SearchSlice reducer and for making the rest api urls.
It even helped my catch a bug in the addLanguage code.
