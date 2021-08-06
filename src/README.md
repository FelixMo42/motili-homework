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

The word 'detailed' is used loosly here. It shows the description and the starts, but thats about it.
I figured this was more about proving I can use react Router than actually just listing out random repo info. 

### 6. Responsive Design ###

Its not very responsive, but the Search page does scale and looks pretty good on mobile.
The about page is literaly just the divs tags with some text, it dosent even have css.
I have some actually good responsive design befor for php templates, so I can show you that if you want.

### Bonus ###

I have some testing for the SearchSlice reducer and for making the rest api urls.
It even helped my catch a bug in the addLanguage code.
I also some basic intergration testing for the Search element.
