awesome-select
==============

A lightweight jQuery based custom select.

How to use
----------

Include jquery,awesome-select.js and awesome-select.css.

Then initialize the plugin on your select element as given show below. Optionally you can also pass an ``onChange`` event.

#####HTML#####
```html```
 <select id="otherCategorySelect">
    <option value="">Other</option> 
    <option value="Clothing">Clothing</option> 
    <option value="Electronics">Electronics</option> 
    <option value="Gifts">Gifts</option>
  </select>
```


#####Javascript#####
```javascript
AwesomeSelect.awesome('#otherCategorySelect',{
  // optional onChange event
  onChange : function(){
    alert("I am on change event");
  }
});

// OR

// without onChange event
AwesomeSelect.awesome('#otherCategorySelect');
```
